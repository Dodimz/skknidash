<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    protected array $roles = [
        'admin' => ['title' => 'Admin', 'description' => 'Admin role description'],
        'staff' => ['title' => 'Staff', 'description' => 'Staff role description'],
    ];

    protected array $crud_permissions = [
        'posts' => [
            'title' => 'Manage posts',
            'action' => ['index' => 1, 'show' => 1, 'create' => 1, 'edit' => 1, 'delete' => 1],
        ],
        'post_category' => [
            'title' => 'Manage post categories',
            'action' => ['index' => 1, 'create' => 1, 'edit' => 1, 'delete' => 1],
        ],
        'post_tags' => [
            'title' => 'Manage post tags',
            'action' => ['index' => 1, 'create' => 1, 'edit' => 1, 'delete' => 1],
        ],
        'comments' => [
            'title' => 'Manage comments',
            'action' => ['index' => 1, 'delete' => 1, 'approve' => 1, 'unApprove' => 1],
        ],
        'products' => [
            'title' => 'Manage products',
            'action' => ['index' => 1, 'delete' => 1, 'edit' => 1, 'create' => 1, 'show' => 1],
        ],
        'product_categories' => [
            'title' => 'Manage product categories',
            'action' => ['index' => 1, 'delete' => 1, 'edit' => 1, 'create' => 1],
        ],
        'product_tags' => [
            'title' => 'Manage product tags',
            'action' => ['index' => 1, 'delete' => 1, 'edit' => 1, 'create' => 1],
        ],
        'product_reviews' => [
            'title' => 'Manage product reviews',
            'action' => ['index' => 1, 'approve' => 1, 'unApprove' => 1],
        ],
        'coupons' => [
            'title' => 'Manage coupons',
            'action' => ['index' => 1, 'delete' => 1, 'edit' => 1, 'create' => 1],
        ],
        'orders' => [
            'title' => 'Manage orders',
            'action' => ['index' => 1, 'delete' => 1, 'show' => 1],
        ],
        'support_tickets' => [
            'title' => 'Manage support tickets',
            'action' => ['index' => 1, 'delete' => 1, 'show' => 1, 'reply' => 1],
        ],
        'form_response' => [
            'title' => 'Manage form response',
            'action' => ['index' => 1, 'delete' => 1, 'show' => 1, 'filter' => 1],
        ],
        'pricing_plans' => [
            'title' => 'Manage pricing plans',
            'action' => ['index' => 1, 'delete' => 1, 'edit' => 1, 'create' => 1, 'show' => 1],
        ],
        'payment_history' => [
            'title' => 'Manage payment history',
            'action' => ['index' => 1, 'show' => 1],
        ],
        'media' => [
            'title' => 'Manage media',
            'action' => ['index' => 1],
        ],
        'subscribers' => [
            'title' => 'Manage subscribers',
            'action' => ['index' => 1, 'delete' => 1],
        ],
        'contacts' => [
            'title' => 'Manage contacts',
            'action' => ['index' => 1, 'delete' => 1, 'show' => 1],
        ],
        'portfolios' => [
            'title' => 'Manage portfolios',
            'action' => ['index' => 1, 'delete' => 1, 'edit' => 1, 'create' => 1, 'show' => 1],
        ],
        'portfolio_categories' => [
            'title' => 'Manage portfolio categories',
            'action' => ['index' => 1, 'delete' => 1, 'edit' => 1, 'create' => 1],
        ],
        'services' => [
            'title' => 'Manage services',
            'action' => ['index' => 1, 'delete' => 1, 'edit' => 1, 'create' => 1, 'show' => 1],
        ],
        'service_categories' => [
            'title' => 'Manage service categories',
            'action' => ['index' => 1, 'delete' => 1, 'edit' => 1, 'create' => 1],
        ],
        'case_study' => [
            'title' => 'Manage case study',
            'action' => ['index' => 1, 'delete' => 1, 'edit' => 1, 'create' => 1, 'show' => 1],
        ],
        'case_study_categories' => [
            'title' => 'Manage case study categories',
            'action' => ['index' => 1, 'delete' => 1, 'edit' => 1, 'create' => 1],
        ],
        'teams' => [
            'title' => 'Manage teams',
            'action' => ['index' => 1, 'delete' => 1, 'edit' => 1, 'create' => 1],
        ],
        'testimonials' => [
            'title' => 'Manage testimonials',
            'action' => ['index' => 1, 'delete' => 1, 'edit' => 1, 'create' => 1],
        ],
        'pages' => [
            'title' => 'Manage pages',
            'action' => ['index' => 1, 'delete' => 1, 'edit' => 1, 'create' => 1, 'show' => 1],
        ],
        'appearance' => [
            'title' => 'Manage appearance',
            'action' => ['themes' => 1, 'menus' => 1, 'customize' => 1],
        ],
        'users' => [
            'title' => 'Manage users',
            'action' => ['index' => 1, 'create' => 1, 'delete' => 1, 'edit' => 1, 'role_permission' => 1],
        ],
        'settings' => [
            'title' => 'Manage settings',
            'action' => ['manage' => 1],
        ],

    ];

    protected array $permissions = [
        'backup_database' => ['title' => 'Backup database', 'description' => 'This is description'],
        'update_configuration' => ['title' => 'Backup database', 'description' => 'This is description'],
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->saveRoles();
        $this->savePermissions();
        $this->addAllPermissionToAdmin();
    }

    protected function saveRoles()
    {
        foreach ($this->roles as $name => $role_array) {
            $role = new Role;
            $role->description = $role_array['description'];
            $role->title = $role_array['title'];
            $role->name = $name;
            $role->guard_name = 'web';
            $role->save();
        }
    }

    protected function savePermissions()
    {
        //Saving crud group
        foreach ($this->crud_permissions as $group => $crud_permissions) {
            foreach ($crud_permissions['action'] as $action => $value) {
                if ($value) {
                    $permission = new Permission;
                    $permission->name = "{$group}.{$action}";
                    $permission->title = $crud_permissions['title'];
                    $permission->crud_group = $group;
                    $permission->crud_action = $action;
                    $permission->guard_name = 'web';
                    $permission->save();
                }
            }
        }

        //Special permission
        foreach ($this->permissions as $name => $permission_array) {
            $permission = new Permission;
            $permission->name = $name;
            $permission->title = $permission_array['title'];
            $permission->description = $permission_array['description'];
            $permission->guard_name = 'web';
            $permission->save();
        }
    }

    private function addAllPermissionToAdmin()
    {
        $role = Role::where(['name' => 'admin'])->first();
        $role->syncPermissions(Permission::all());

        if (app()->environment('local')) {
            foreach (Role::where('name', '!=', 'admin')->get() as $role) {
                $role->syncPermissions(Permission::inRandomOrder()->take(8)->get());
            }
        }
    }
}
