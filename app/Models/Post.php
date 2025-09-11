<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    //
    protected $fillable = [
        'user_id',
        'thread_id',
        'content',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function thread()
    {
        return $this->belongsTo(Thread::class);
    }

    public function reactions() {
        return $this->belongsToMany(User::class, 'reactions');
    }

    // Checks if post already liked by the user
    public function isLikedBy(User $user) {
        return $this->reactions()->where('user_id', $user->id)->exists();
    }

    // Likes / Unlike the post
    public function toggleReaction(User $user) {
        return $this->reactions()->toggle($user->id);
    }

}
