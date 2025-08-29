<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Forum extends Model
{
    //
    protected $fillable = ['title', 'slug', 'description', 'parent_forum_id'];


    public function children()
    {
        return $this->hasMany(Forum::class, 'parent_forum_id');
    }

    public function parent()
    {
        return $this->belongsTo(Forum::class, 'parent_forum_id');
    }

    public function threads() {
        return $this->hasMany(Thread::class);
    }

    public function posts() { // Number of posts belonging to forum, from all threads
        return $this->hasManyThrough(Post::class, Thread::class);
    }

    // public function getRouteKeyName() // use slug for route
    // {
    //     return 'slug';
    // }

}
