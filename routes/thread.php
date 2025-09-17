<?php

use App\Http\Controllers\ThreadController;
use Illuminate\Support\Facades\Route;

Route::get('thread/{thread}', [ThreadController::class, 'show'])->name('thread.showThread');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('forum/{forum}/thread/create', [ThreadController::class, 'create'])->name('thread.createThread');
    Route::get('thread/{thread}/edit', [ThreadController::class, 'edit'])->name('thread.editThread');
    Route::post('thread', [ThreadController::class, 'store'])->name('thread.storeThread');
    Route::put('thread/{thread}', [ThreadController::class, 'update'])->name('thread.updateThread');
    Route::delete('thread/{thread}', [ThreadController::class, 'destroy'])->name('thread.removeThread');
});
