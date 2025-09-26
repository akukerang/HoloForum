<?php

use App\Http\Controllers\ThreadController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Middleware\Moderator;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', Moderator::class])->group(function () {
    Route::put('mod/user/{user}/ban', [RegisteredUserController::class, 'modToggleBan'])->name('moderator.toggleBanUser');
    Route::put('mod/thread/{thread}/lock', [ThreadController::class, 'modToggleLock'])->name('moderator.toggleLockThread');
    Route::delete('mod/thread/{thread}', [ThreadController::class, 'modDestroyThread'])->name('moderator.removeThread');
    Route::delete('mod/post/{post}', [PostController::class, 'modDestroyPost'])->name('moderator.removePost');
});
