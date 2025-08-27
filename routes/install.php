<?php

use App\Http\Controllers\InstallController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Installer Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [InstallController::class, 'step0'])->name('step0');
Route::get('step1', [InstallController::class, 'step1'])->name('step1');
Route::get('step2', [InstallController::class, 'step2'])->name('step2');
Route::get('step3', [InstallController::class, 'step3'])->name('step3');
Route::get('step4', [InstallController::class, 'step4'])->name('step4');
Route::get('step5', [InstallController::class, 'step5'])->name('step5');
Route::get('step6', [InstallController::class, 'step6'])->name('step6');

Route::post('database_installation', [InstallController::class, 'database_installation'])->name('install.db');
Route::get('import_sql', [InstallController::class, 'import_sql'])->name('import_sql');

Route::post('verify_purchase', [InstallController::class, 'verify_purchase'])->name('verify.purchase');

Route::post('system_settings', [InstallController::class, 'system_settings'])->name('system_settings');
