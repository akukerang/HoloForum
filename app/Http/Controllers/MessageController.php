<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\User;
use App\Models\Message;

class MessageController extends Controller
{
    //
    public function show(User $user)
    {
        // Gets current user by auth
        $currentUser = auth()->user();

        $messages = Message::where(
            // Gets message where receiver is currentUser and sender is the user messaged
            function ($query) use ($currentUser, $user) {
                $query->where("receiver_id", $currentUser->id)
                    ->where("sender_id", $user->id);
            }
        )->orWhere(
            // Gets message where receiver is user messaged and sender is the current user
            function ($query) use ($currentUser, $user) {
                $query->where("receiver_id", $user->id)
                    ->where("sender_id", $currentUser->id);
            }
        )->orderBy("created_at", "asc")->get();

        return Inertia::render(
            'Message/ShowMessage',
            [
                'currentUser' => $currentUser,
                'targetUser' => $user,
                'messages' => $messages
            ]
        );
    }

    public function store(Request $request, User $user)
    {
        $data = $request->validate([
            'message' => 'required|string|max:255'
        ]);

        $currentUser = auth()->user();

        $message = Message::create([
            'receiver_id' => $user->id,
            'sender_id' => $currentUser->id,
            'message' => $data['message'],
        ]);
    }
}
