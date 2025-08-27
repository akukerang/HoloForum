<?php

use App\Http\Controllers\ForumController;
use App\Models\Forum;
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

    // Admin Related Routes
    Route::get('admin', function() {
        $forums = Forum::all();
        return Inertia::render('Admin/Index', compact('forums'));
    })->name('admin.index');
    // Forum Creation, Editing, Deletion
    Route::get('admin/forum/create', [ForumController::class,'create'])->name('admin.createForum');
    Route::get('admin/forum/{forum}/edit', [ForumController::class,'edit'])->name('admin.editForum');
    Route::post('/forum', [ForumController::class, 'store'])->name('forum.store');
    Route::delete('/forum/{forum}', [ForumController::class, "destroy"])->name('forum.remove');
    Route::put('/forum/{forum}', [ForumController::class, 'update'])->name('forum.update');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
