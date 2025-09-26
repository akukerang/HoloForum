<?php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::get('thread/{thread}/{post}/', [PostController::class, 'show'])->name('post.showPost');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('reply/{thread}', [PostController::class, 'create'])->name('post.createPost');
    Route::get('reply/{thread}/{post}', [PostController::class, 'createReply'])->name('post.createReply');
    Route::get('reply/{thread}/{post}/edit', [PostController::class, 'edit'])->name('post.edit');

    Route::post('post', [PostController::class, 'store'])->name('post.store');
    Route::put('post/{post}', [PostController::class, 'update'])->name('post.update');
    Route::delete('post/{post}', [PostController::class, 'destroy'])->name('post.deletePost');
    Route::post('post/{post}/reactions', [PostController::class, 'toggleReaction'])->name('post.toggleReaction');
    Route::post('post/{post}/reply', [PostController::class, 'storeReply'])->name('post.storeReply');
});
