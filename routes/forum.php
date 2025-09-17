<?php

use App\Http\Controllers\ForumController;
use Illuminate\Support\Facades\Route;

Route::get('/', [ForumController::class, 'index'])->name('home');
Route::get('forum/{forum}', [ForumController::class, 'show'])->name('forum.forumShow');
