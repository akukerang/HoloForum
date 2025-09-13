<?php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/post', [PostController::class, 'store'])->name('post.store');
    Route::delete('/post/{post}', [PostController::class, 'destroy'])->name('post.delete');
    Route::post('/post/{post}/reactions', [PostController::class, 'toggleReaction'])->name('post.toggleReaction');
    Route::post('/post/{post}/reply', [PostController::class, 'storeReply'])->name('post.storeReply');
});

