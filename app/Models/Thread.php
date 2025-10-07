<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Thread extends Model
{
    //
    protected $fillable = ['title', 'forum_id', 'user_id'];
    public function forum()
    { // which forum thread belongs to
        return $this->belongsTo(Forum::class);
    }

    public function user()
    { // who created the thread
        return $this->belongsTo(User::class);
    }

    public function posts()
    { // get posts for thread
        return $this->hasMany(Post::class);
    }

    public function latestPost()
    { // get latest post
        return $this->hasOne(Post::class)->latestOfMany();
    }

    public function bookmarkedUsers()
    {
        return $this->belongsToMany(User::class, 'bookmarked_threads');
    }
}
