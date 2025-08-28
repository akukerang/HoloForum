<?php

use App\Http\Controllers\ForumController;
use App\Http\Controllers\ThreadController;
use App\Models\Forum;
use App\Models\Thread;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/forum', [ForumController::class, 'index'])->name('forum.index');
Route::get('/forum/{forum}', [ForumController::class, 'show'])->name('forum.show');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Admin Related Routes
    Route::get('admin', function() {
        $forums = Forum::all();
        $threads = Thread::all();
        return Inertia::render('Admin/Index', compact('forums', 'threads'));
    })->name('admin.index');
    // Forum Creation, Editing, Deletion
    Route::get('admin/forum/create', [ForumController::class,'create'])->name('admin.createForum');
    Route::get('admin/forum/{forum}/edit', [ForumController::class,'edit'])->name('admin.editForum');
    Route::post('/forum', [ForumController::class, 'store'])->name('forum.store');
    Route::delete('/forum/{forum}', [ForumController::class, "destroy"])->name('forum.remove');
    Route::put('/forum/{forum}', [ForumController::class, 'update'])->name('forum.update');


    Route::get('admin/thread/create', [ThreadController::class, 'adminCreate'])->name('admin.createThread');
    Route::post('admin/thread', [ThreadController::class, 'store'])->name('admin.storeThread');



});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
