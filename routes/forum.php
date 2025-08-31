<?php

use App\Http\Controllers\ForumController;
use Illuminate\Support\Facades\Route;

Route::get('/forum', [ForumController::class, 'index'])->name('forum.index');
Route::get('/forum/{forum}', [ForumController::class, 'show'])->name('forum.forumShow');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::post('/forum', [ForumController::class, 'store'])->name('forum.store');
    Route::delete('/forum/{forum}', [ForumController::class, "destroy"])->name('forum.remove');
    Route::put('/forum/{forum}', [ForumController::class, 'update'])->name('forum.update');

});

