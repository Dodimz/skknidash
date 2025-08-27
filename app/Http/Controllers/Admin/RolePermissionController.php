<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Backend\RoleStoreRequest;
use App\Http\Requests\Backend\RoleUpdateRequest;
use App\Repositories\Admin\RolePermissionRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class RolePermissionController extends Controller
{

    public function __construct()
    {
        // for demo mood
        $this->middleware('demo', ['only' => ['destroy', 'store', 'update', 'bulkDelete']]);
    }

    public function index(Request $request, RolePermissionRepository $repository)
    {
        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? 'id';
        $data['sort']['order'] = $request->sort['order'] ?? 'desc';
        $data['roles'] = $repository->paginateSearchResult($data['search'], $data['sort']);

        return Inertia::render('Users/RolePermission/Index', $data);
    }

    public function create(RolePermissionRepository $repository)
    {
        $data['permissions'] = $repository->getPermissionTable();

        return Inertia::render('Users/RolePermission/Create', $data);
    }

    /**
     * Store role
     */
    public function store(RoleStoreRequest $request, RolePermissionRepository $repository): RedirectResponse
    {
        $repository->store($request);

        return redirect()->route('admin.roles.permissions.index')->with('success', 'Role successfully created');
    }

    /**
     * Edit role
     */
    public function edit(Role $role, RolePermissionRepository $repository): Response
    {
        $data['permissions'] = $repository->getPermissionTable();
        $data['permissionsId'] = $role->permissions->pluck('id')->all();
        $data['role'] = $role;

        return Inertia::render('Users/RolePermission/Edit', $data);
    }

    /**
     * Update role
     */
    public function update(RoleUpdateRequest $request, Role $role, RolePermissionRepository $repository): RedirectResponse
    {
        $repository->update($request, $role);

        return redirect()->route('admin.roles.permissions.index')->with('success', 'Role successfully updated');
    }

    /**
     * delete role
     */
    public function destroy(Role $role): RedirectResponse
    {
        if ($role->name == 'admin') {
            return back()->with('error', 'This role is not deletable');
        }
        $role->delete();

        return back()->with('success', 'Role successfully deleted');
    }

    /**
     * Bulk delete
     */
    public function bulkDelete(Request $request, RolePermissionRepository $repository): RedirectResponse
    {
        $repository->bulkDelete($request);

        return back()->with('success', 'Selected role successfully deleted');
    }
}
