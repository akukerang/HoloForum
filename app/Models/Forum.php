<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;


class Forum extends Model
{
    //
    protected $fillable = ['title', 'description', 'parent_forum_slug', 'slug'];
    protected $primaryKey = 'slug';
    public $incrementing = false;
    protected $keyType = 'string';


    public function children()
    {
        return $this->hasMany(Forum::class, 'parent_forum_slug', 'slug');
    }

    public function parent()
    {
        return $this->belongsTo(Forum::class, 'parent_forum_slug', 'slug');
    }

    public function threads()
    {
        return $this->hasMany(Thread::class, 'forum_slug', 'slug');
    }

    public function posts()
    { // Number of posts belonging to forum, from all threads
        return $this->hasManyThrough(Post::class, Thread::class);
    }


    use HasSlug;

    /**
     * Get the options for generating the slug.
     */
    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug')
            ->usingSeparator('-');
    }
    public function getRouteKeyName()
    {
        return 'slug';
    }
}
