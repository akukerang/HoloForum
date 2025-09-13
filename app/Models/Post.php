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
        'parent_id'
    ];

    protected $appends = ['liked'];

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

    // Likes / Unlike the post
    public function toggleReaction(User $user) {
        return $this->reactions()->toggle($user->id);
    }
    
    // Checks if post already liked by the user
    public function getLikedAttribute() {
        $user = auth()->user();
        if (!$user) {
            return false;
        }
        return $this->reactions()->where('user_id', $user->id)->exists();
    }

    // Reply Parent
    public function parent(){
        return $this->belongsTo(Post::class, 'parent_id');
    }

    // Reply Children
    public function children(){
        return $this->hasMany(Post::class, 'parent_id');
    }

}
