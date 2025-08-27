<?php

namespace App\Repositories\Admin;

use App\Models\User;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserRepositories
{
    use ModelRepositoryTraits;

    /**
     * Object model will be used to modify user table
     */
    protected User $user;

    /**
     *  Constructor for user repository
     */
    public function __construct(User $user)
    {
        $this->model = $user;
    }

    /**
     * Get users
     */
    public function paginateSearchResult($search, array $sort = []): LengthAwarePaginator
    {
        $query = $this->model->newQuery();

        if ($search) {
            $query->orWhere('name', 'like', "%$search%")
                ->orWhere('email', 'like', "%$search%");
        }

        $query->orderBy($sort['column'], $sort['order']);

        return $query->paginate(30)
            ->appends(array_filter([
                'search' => $search,
                'sort' => $sort,
            ]));
    }

    /**
     * Store user
     */
    public function store(Request $request): void
    {
        $user = $this->create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'about' => $request->about,
        ]);

        // Assign role
        $user->assignRole($request->role);
    }

    /**
     * Update user
     */
    public function update(User $user, Request $request): void
    {
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'about' => $request->about,
        ]);

        if ($request->password) {
            $user->update([
                'password' => Hash::make($request->password),
            ]);
        }
        // Assign role
        $user->syncRoles([]);
        $user->assignRole($request->role);
    }

    /**
     * Delete user
     *
     * @throws \Exception
     */
    public function destroy(User $user): void
    {
        $auth = Auth::user();
        if ($auth->email == $user->email) {
            throw new \Exception('This user is not deletable');
        }
        $user->delete();
    }

    /**
     * Bulk delete
     */
    public function bulkDelete(Request $request): void
    {
        $auth = Auth::user();
        $ids = explode(',', $request->ids);
        $this->model->whereIn('id', $ids)->where('email', '!=', $auth->email)->delete();
    }
}
