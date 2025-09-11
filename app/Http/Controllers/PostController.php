<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'content'=>'required|string',
            'thread_id'=>'required|numeric|exists:threads,id',
            'user_id'=>'required|numeric|exists:users,id',
        ]);
        Post::create($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        if (auth()->id() !== $post->user_id) { // check if user deleting, is the user's post
            abort(403, 'Unauthorized action.');
        }
        $post->delete();
    }

    public function toggleReaction(Post $post) {
        $user = auth()->user();
        $post->toggleReaction($user);
        return redirect()->back(); 
    }


}
