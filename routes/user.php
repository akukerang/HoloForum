<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Notifications\DatabaseNotification;
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
    Route::post('notifications/mark-read/{id}', function ($id) {
        $user = auth()->user();

        $notification = $user->notifications()->findOrFail($id);
        $subject = $notification->data['subject'];

        // TODO: This seems like wrong way to do it?
        $user->unreadNotifications()
            ->whereRaw("json_extract(data, '$.subject') = ?", [$subject])
            ->update(['read_at' => now()]);
    })->name('user.markRead');
});
