<?php

use App\Http\Controllers\ForumController;
use App\Http\Controllers\ThreadController;
use App\Http\Controllers\Auth\RegisteredUserController;

use App\Http\Middleware\Admin;
use App\Models\Forum;
use App\Models\Thread;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::middleware(['auth', 'verified', Admin::class])->group(function () {

    # Index Page
    Route::get('admin', function () {
        $forums = Forum::all();
        $threads = Thread::all();
        $users = User::all();
        return Inertia::render('Admin/Index', compact('forums', 'threads', 'users'));
    })->name('admin.index');


    # Forum Pages
    Route::get('admin/forum/create', [ForumController::class, 'create'])->name('admin.createForum');
    Route::get('admin/forum/{forum}/edit', [ForumController::class, 'edit'])->name('admin.editForum');

    # Forum Actions
    Route::post('admin/forum', [ForumController::class, 'store'])->name('admin.storeForum');
    Route::put('admin/forum/{forum}', [ForumController::class, 'update'])->name('admin.updateForum');
    Route::delete('admin/forum/{forum}', [ForumController::class, "destroy"])->name('admin.removeForum');

    # Thread Pages
    Route::get('admin/thread/create', [ThreadController::class, 'adminCreate'])->name('admin.createThread');
    Route::get('admin/thread/{thread}/edit', [ThreadController::class, 'adminEdit'])->name('admin.editThread');

    # Thread Actions
    Route::post('admin/thread', [ThreadController::class, 'adminStore'])->name('admin.storeThread');
    Route::put('admin/thread/{thread}', [ThreadController::class, 'adminUpdate'])->name('admin.updateThread');
    Route::delete('admin/thread/{thread}', [ThreadController::class, 'adminDestroy'])->name('admin.removeThread');

    // # User Page
    Route::get('admin/user/{user}/edit', [RegisteredUserController::class, 'edit'])->name('admin.editUser');

    // # User Actions
    Route::delete('admin/user/{user}', [RegisteredUserController::class, 'destroy'])->name('admin.removeUser');
    Route::put('admin/user/{user}', [RegisteredUserController::class, 'update'])->name('admin.updateUser');
});
