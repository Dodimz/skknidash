<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\CaseStudyMenuResource;
use App\Http\Resources\Admin\CategoriesMenuResource;
use App\Http\Resources\Admin\PageMenuResource;
use App\Http\Resources\Admin\PortfolioMenuResource;
use App\Http\Resources\Admin\PostMenuResource;
use App\Http\Resources\Admin\ServiceMenuResource;
use App\Models\CaseStudy;
use App\Models\Category;
use App\Models\Page;
use App\Models\Portfolio;
use App\Models\Post;
use App\Models\Service;
use App\Repositories\Admin\MenuRepository;
use App\Repositories\SettingRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuController extends Controller
{

    public function __construct()
    {
        // for demo mood
        $this->middleware('demo', ['only' => ['store']]);
    }

    /**
     * Menu index
     */
    public function index(Request $request, MenuRepository $repository)
    {
        $data['pages_menu'] = new PageMenuResource(Page::all());
        $data['posts_menu'] = new PostMenuResource(Post::all());
        $data['services_menu'] = new ServiceMenuResource(Service::all());
        $data['case_study_menu'] = new CaseStudyMenuResource(CaseStudy::all());
        $data['portfolio_menu'] = new PortfolioMenuResource(Portfolio::all());
        $data['categories_menu'] = new CategoriesMenuResource(Category::all());
        $data['edit_action'] = $request->edit_action ?? 'main_menu';
        $data['menu_list'] = $repository->getMenus($data['edit_action']);

        return Inertia::render('Menus/Index', $data);
    }

    /**
     * Store menu
     */
    public function store(Request $request, MenuRepository $repository, SettingRepository $settingRepository): RedirectResponse
    {
        $repository->store($request, $settingRepository);

        return back()->with('success', 'Menu successfully saved');
    }
}
