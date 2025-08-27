<?php

namespace App\Repositories\Admin;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionRepository
{
    /**
     * Get search result with paginate
     */
    public function paginateSearchResult($search, array $sort = []): LengthAwarePaginator
    {
        $query = Role::query();

        // search category
        if (isset($search)) {
            $query->where('name', 'LIKE', "%$search%");
        }

        // sort category
        if (isset($sort['column'])) {
            $query->orderBy($sort['column'], $sort['order']);
        }

        return $query->paginate(30)
            ->appends(array_filter([
                'search' => $search,
                'sort' => $sort,
            ]));
    }

    public function permissions()
    {
        return Permission::all();
    }

    public function roles()
    {
        return Role::all();
    }

    public function getUserRoleTable(User $user)
    {
        return $this->roles()->transform(function ($role) use ($user) {
            return array_merge($role->only('id', 'name', 'title', 'description'), [
                'has_role' => $user->hasRole($role),
            ]);
        });
    }

    public function getUserPermissionTable(User $user): array
    {
        $permissions = [];
        foreach (Permission::all() as $permission) {
            if ($permission->crud_group) {
                $permissions['crud_permissions'][$permission->crud_group]['title'] = $permission->title;
                $permissions['crud_permissions'][$permission->crud_group]['actions'][$permission->crud_action] = array_merge($permission->only(['id', 'name']),
                    [
                        'has_permission' => $user->hasPermissionTo($permission),
                        'has_direct_permission' => $user->hasDirectPermission($permission),
                    ]);
            } else {
                $permissions['special_permissions'][] = array_merge($permission->only(['id', 'name', 'title', 'description']),
                    [
                        'has_permission' => $user->hasPermissionTo($permission),
                        'has_direct_permission' => $user->hasDirectPermission($permission),
                    ]
                );
            }
        }

        return $permissions;
    }

    public function getPermissionTable(): array
    {
        $permissions = [];
        foreach (Permission::all() as $permission) {
            if ($permission->crud_group) {
                $permissions['crud_permissions'][$permission->crud_group]['title'] = $permission->title;
                $permissions['crud_permissions'][$permission->crud_group]['actions'][$permission->crud_action] = array_merge($permission->only(['id', 'name']));
            }
        }

        return $permissions;
    }

    /**
     * Store role
     */
    public function store(Request $request): void
    {
        $role = Role::create(['title' => $request->title, 'name' => strtolower($request->title), 'description' => $request->description]);
        $permission = array_map(fn($p) => (int) $p, $request->permissions);
        $role->syncPermissions($permission);
    }

    /**
     * Update role
     */
    public function update(Request $request, Role $role): void
    {
        $role->update(['title' => $request->title, 'name' => strtolower($request->title), 'description' => $request->description]);
        $permission = array_map(fn($p) => (int) $p, $request->permissions);
        $role->syncPermissions($permission);
    }

    /**
     * Bulk delete
     */
    public function bulkDelete(Request $request): void
    {
        $ids = explode(',', $request->ids);
        Role::whereIn('id', $ids)->where('name', '!=', 'admin')->delete();
    }
}
