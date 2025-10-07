<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\BroadcastMessage;
use App\Models\User;

class NewMessage extends Notification
{

    /**
     * Create a new notification instance.
     */
    public function __construct(public User $sender)
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database', 'broadcast'];
    }

    public function toDatabase($notifiable): array
    {
        return [
            'type' => 'message',
            'subject' => "{$this->sender->name}",
            'action_url' => route('showMessage', $this->sender->name),
        ];
    }

    public function toBroadcast(object $notifiable)
    {
        return new BroadcastMessage([
            'type' => 'message',
            'subject' => "{$this->sender->name}",
            'action_url' => route('showMessage', $this->sender->name),
        ]);
    }
}
