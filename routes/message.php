<?php

use App\Http\Controllers\MessageController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\NotBanned;


Route::middleware(['auth', 'verified', NotBanned::class])->group(function () {

    Route::get('messages/{user}', [MessageController::class, 'show'])->name('getMessage');
    Route::post('messages/{user}', [MessageController::class, 'store'])->name('sendMessage');
});
