<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Support\Facades\Route;

Route::get('user/{user}', [RegisteredUserController::class, 'show'])->name('user.showUser');

Route::middleware(['auth', 'verified'])->group(function () {
    // Unread notifications
    Route::get('notifications/unread', function () {
        // dd(auth()->user()->unreadNotifications())
        return response()->json([
            auth()->user()->unreadNotifications
        ]);
    })->name('user.unread');

    // All notifications


    // Mark all as read
    Route::post('notifications/mark-all-read', function () {
        auth()->user()->unreadNotifications->markAsRead();
        return response()->json([
            'status' => 'success',
            'message' => 'All notifications marked as read.'
        ]);
    })->name('user.markAllRead');

    // Mark single as read
    Route::post('notifications/mark-read/{notification}', function ($notification) {
        $user = auth()->user();
        $subject = $notification->subject;

        // Mark all notifications of the same subject as read
        $user->unreadNotifications->where('data->subject', $subject)->markAsRead();

        return response()->json([
            'status' => 'success',
            'message' => 'Notification marked as read.'
        ]);
    })->name('user.markRead');
});
