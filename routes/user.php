<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Support\Facades\Route;

Route::get('user/{user}', [RegisteredUserController::class, 'show'])->name('user.showUser');

Route::middleware(['auth', 'verified'])->group(function () {
    // Unread notifications
    Route::get('notifications/unread', function () {

        $notifications = auth()->user()
            ->unreadNotifications()
            ->orderBy('created_at', 'desc')
            ->get()
            // Unique based off subject
            ->unique(function ($n) {
                return data_get($n, 'data.subject');
            })
            ->values();

        return response()->json([
            $notifications
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
        // Finds all with the same subject and marks them as read
        $user->unreadNotifications()->where('data->subject', $subject)->update(['read_at' => now()]);
    })->name('user.markRead');
});
