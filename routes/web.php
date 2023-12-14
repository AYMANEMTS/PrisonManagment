<?php

use App\Http\Controllers\Authentication\LoginController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Settings\Cellule\CelluleController;
use App\Http\Controllers\Settings\Grades\GradeController;
use App\Http\Controllers\Settings\Quartier\QuartierController;
use App\Http\Controllers\Settings\SettingsController;
use App\Http\Controllers\Tasks\AppelController;
use App\Http\Controllers\Users\EmployeesController;
use App\Http\Controllers\Users\PrisonerController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect()->route('loginV2');
//    return Inertia::render('Welcome', [
//        'canLogin' => Route::has('login'),
//        'canRegister' => Route::has('register'),
//        'laravelVersion' => Application::VERSION,
//        'phpVersion' => PHP_VERSION,
//    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
Route::middleware('auth')->group(function (){
    Route::get('employees',[EmployeesController::class,'index'])->name('employees.index');
    Route::get('employees/create',[EmployeesController::class,'create'])->name('employees.create');
    Route::post('employees/create',[EmployeesController::class,'store'])->name('employees.store');
    Route::post('employees/delete',[EmployeesController::class,'destroy'])->name('employees.destroy');

    Route::get('settings',[SettingsController::class,'index'])->name('settings.index');

    Route::post('grade/create',[GradeController::class,'store'])->name('grade.store');
    Route::get('grade/edit/{id}',[GradeController::class,'edit'])->name('grade.edit');
    Route::patch('grade/update/{id}',[GradeController::class,'update'])->name('grade.update');
    Route::post('grade/delete/{id}',[GradeController::class,'destroy'])->name('grade.destroy');

    Route::post('quartier/create',[QuartierController::class,'store'])->name('quartier.store');
    Route::get('quartier/edit/{id}',[QuartierController::class,'edit'])->name('quartier.edit');
    Route::get('quartier/{id}',[QuartierController::class,'show'])->name('quartier.show');
    Route::patch('quartier/update/{id}',[QuartierController::class,'update'])->name('quartier.update');
    Route::post('quartier/delete/{id}',[QuartierController::class,'destroy'])->name('quartier.destroy');Route::post('quartier/create',[QuartierController::class,'store'])->name('quartier.store');

    Route::post('cellule/create',[CelluleController::class,'store'])->name('cellule.store');
    Route::patch('cellule/update/{id}',[CelluleController::class,'update'])->name('cellule.update');
    Route::post('cellule/delete/{id}',[CelluleController::class,'destroy'])->name('cellule.destroy');


    Route::get('/prisonerss',[PrisonerController::class,'index'])->name('prisoners.index');
    Route::get('prisoners/create',[PrisonerController::class,'create'])->name('prisoners.create');
    Route::post('prisoners/create',[PrisonerController::class,'store'])->name('prisoners.store');
    Route::get('prisoners/edit/{id}',[PrisonerController::class,'edit'])->name('prisoners.edit');
    Route::post('prisoners/update/{id}',[PrisonerController::class,'update'])->name('prisoners.update');
    Route::post('prisoners/delete/{id}',[PrisonerController::class,'destroy'])->name('prisoners.destroy');


    Route::get('tasks',[AppelController::class,'getTodayAppels'])->name("tasks");
    Route::post('task/{id}',[AppelController::class,'storeAppel'])->name('storeAppel');
});


Route::get('dash',function (){
    return Inertia::render('Dashboard/index');
})->name('dash')->middleware('auth');


Route::get('/loginV2',[LoginController::class,'view'])->name("loginV2");
Route::post('/loginV2',[LoginController::class,'store'])->name("loginStore");



















