<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Forum extends Model
{
    //
    protected $fillable = ['title', 'slug', 'description', 'parent_forum_id'];

}
