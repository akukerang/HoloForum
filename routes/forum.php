<?php

use App\Http\Controllers\ForumController;
use Illuminate\Support\Facades\Route;

Route::get('/forum', [ForumController::class, 'index'])->name('forum.index');
Route::get('/forum/{forum}', [ForumController::class, 'show'])->name('forum.forumShow');
