<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\BroadcastMessage;
use App\Models\User;

class NewMessage extends Notification
{
    use Queueable;

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
            'subject' => "You have a new message from {$this->sender->name}",
            'action_url' => route('showMessage', $this->sender->name),
        ];
    }

    public function toBroadcast(object $notifiable)
    {
        return new BroadcastMessage([
            'type' => 'message',
            'subject' => "You have a new message from {$this->sender->name}",
            'action_url' => route('showMessage', $this->sender->name),
        ]);
    }
}
