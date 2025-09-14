<?php

use App\Http\Controllers\ForumController;
use Illuminate\Support\Facades\Route;

Route::get('/', [ForumController::class, 'index'])->name('home');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/post.php';
require __DIR__ . '/thread.php';
require __DIR__ . '/forum.php';
require __DIR__ . '/admin.php';
