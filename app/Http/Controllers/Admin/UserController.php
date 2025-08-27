<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Backend\UserStoreRequest;
use App\Http\Requests\Backend\UserUpdateRequest;
use App\Models\User;
use App\Repositories\Admin\UserRepositories;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{

    public function __construct()
    {
        // for demo mood
        $this->middleware('demo', ['only' => ['destroy', 'store', 'update', 'bulkDelete']]);
    }

    public function index(Request $request, UserRepositories $repositories)
    {
        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? 'id';
        $data['sort']['order'] = $request->sort['order'] ?? 'desc';
        $data['users'] = $repositories->paginateSearchResult($data['search'], $data['sort']);

        return Inertia::render('Users/Index', $data);
    }

    /**
     * Create user
     */
    public function create(): Response
    {
        $data['roles'] = Role::all();

        return Inertia::render('Users/Create', $data);
    }

    /**
     * Create user
     */
    public function store(UserStoreRequest $request, UserRepositories $repositories): RedirectResponse
    {
        $repositories->store($request);

        return redirect()->route('admin.users.index')->with('success', 'User successfully created');
    }

    /**
     * Edit user
     */
    public function edit(User $user): Response
    {
        $data['user'] = $user;
        $data['roles'] = Role::all();

        return Inertia::render('Users/Edit', $data);
    }

    /**
     * User update
     */
    public function update(UserUpdateRequest $request, User $user, UserRepositories $repositories): RedirectResponse
    {
        $repositories->update($user, $request);

        return redirect()->route('admin.users.index')->with('success', 'User successfully updated');
    }

    /**
     * Delete user
     */
    public function destroy(User $user, UserRepositories $repositories): RedirectResponse
    {
        try {
            $repositories->destroy($user);

            return back()->with('success', 'User successfully deleted');
        } catch (\Exception $exception) {
            return back()->with('error', $exception->getMessage());
        }
    }

    /**
     * Bulk delete
     */
    public function bulkDelete(Request $request, UserRepositories $repositories): RedirectResponse
    {
        $repositories->bulkDelete($request);

        return back()->with('success', 'Selected user successfully deleted');
    }
}
