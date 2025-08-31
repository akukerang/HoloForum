<?php

use App\Http\Controllers\ForumController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ThreadController;
use App\Models\Forum;
use App\Models\Thread;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/forum', [ForumController::class, 'index'])->name('forum.index');
Route::get('/forum/{forum}', [ForumController::class, 'show'])->name('forum.forumShow');





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
    Route::get('admin/thread/{thread}/edit', [ThreadController::class, 'adminEdit'])->name('admin.editThread');
    Route::post('admin/thread', [ThreadController::class, 'adminStore'])->name('admin.storeThread');

    
    Route::get('/thread/{thread}', [ThreadController::class, 'show'])->name('thread.showThread');
    Route::get('/forum/{forum}/thread/create', [ThreadController::class, 'create'])->name('thread.createThread');
    Route::post('thread', [ThreadController::class, 'store'])->name('thread.storeThread');
    Route::put('/thread/{thread}', [ThreadController::class, 'update'])->name('thread.updateThread');
    Route::delete('/thread/{thread}', [ThreadController::class, 'destroy'])->name('thread.removeThread');

    Route::post('/post', [PostController::class, 'store'])->name('post.store');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
