<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Support\Facades\Route;

Route::get('user/{user}', [RegisteredUserController::class, 'show'])->name('user.showUser');
