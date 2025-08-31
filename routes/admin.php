<?php

use App\Http\Controllers\ForumController;
use App\Http\Controllers\ThreadController;
use App\Models\Forum;
use App\Models\Thread;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('admin', function() {
        $forums = Forum::all();
        $threads = Thread::all();
        return Inertia::render('Admin/Index', compact('forums', 'threads'));
    })->name('admin.index');
    Route::get('admin/forum/create', [ForumController::class,'create'])->name('admin.createForum');
    Route::get('admin/forum/{forum}/edit', [ForumController::class,'edit'])->name('admin.editForum');
    Route::get('admin/thread/create', [ThreadController::class, 'adminCreate'])->name('admin.createThread');
    Route::post('admin/thread', [ThreadController::class, 'adminStore'])->name('admin.storeThread');
    Route::get('admin/thread/{thread}/edit', [ThreadController::class, 'adminEdit'])->name('admin.editThread');
});
