<?php

use App\Http\Controllers\ForumController;
use App\Http\Controllers\ThreadController;
use App\Models\Forum;
use App\Models\Thread;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::middleware(['auth', 'verified'])->group(function () {

    # Index Page
    Route::get('admin', function() {
        $forums = Forum::all();
        $threads = Thread::all();
        return Inertia::render('Admin/Index', compact('forums', 'threads'));
    })->name('admin.index');


    # Forum Pages
    Route::get('admin/forum/create', [ForumController::class,'create'])->name('admin.createForum');
    Route::get('admin/forum/{forum}/edit', [ForumController::class,'edit'])->name('admin.editForum');

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

});
