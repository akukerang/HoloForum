<?php

use App\Http\Controllers\ForumController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/forum', [ForumController::class, 'index'])->name('forum.index');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('admin', function() {
        return Inertia::render('Admin/Index');
    })->name('admin.index');
    Route::get('admin/create', function() {
        return Inertia::render('Admin/CreateForum');
    })->name('admin.createForum');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
