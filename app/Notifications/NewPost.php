<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\BroadcastMessage;
use App\Models\Thread;
use App\Models\Post;


class NewPost extends Notification
{

    /**
     * Create a new notification instance.
     */
    public function __construct(public Thread $thread, public Post $post)
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
            'type' => 'post',
            'subject' => "{$this->thread->title}",
            'action_url' => route('post.showPost', [$this->thread->id, $this->post->id]),
        ];
    }

    public function toBroadcast(object $notifiable)
    {
        return new BroadcastMessage([
            'type' => 'post',
            'subject' => "{$this->thread->title}",
            'action_url' => route('post.showPost', [$this->thread->id, $this->post->id]),
        ]);
    }
}
