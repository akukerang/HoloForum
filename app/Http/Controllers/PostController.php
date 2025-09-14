<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Thread;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function create(Thread $thread)
    {
        $user = auth()->user();
        return inertia('Post/CreatePost', [
            'thread' => $thread,
            'user' => $user
        ]);
    }

    public function createReply(Thread $thread, Post $post)
    {
        $user = auth()->user();
        return inertia('Post/CreateReply', [
            'thread' => $thread,
            'parent_post' => $post,
            'user' => $user
        ]);
    }

    public function show(Thread $thread, Post $post, Request $request)
    {
        $perPage = 10;
        $sort = $request->query('sort', 'oldest');
        $query = $thread->posts();
        switch ($sort) {
            case 'latest':
                $query->orderBy('created_at', 'DESC');
                break;
            case 'oldest':
                $query->orderBy('created_at', 'ASC');
                break;
            default:
                $query->orderBy('created_at', 'ASC');
                break;
        }
        $post_index = $query->pluck('id')->search($post->id);
        if ($post_index === false) {
            abort(404);
        }
        $page = (int) ceil(($post_index + 1) / $perPage);
        return redirect()->route(
            'thread.showThread',
            [
                'thread' => $thread->id,
                'page' => $page,
                'sort' => $sort,
            ]
        )->with('message', $post->id);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'content' => 'required|string',
            'thread_id' => 'required|numeric|exists:threads,id',
            'user_id' => 'required|numeric|exists:users,id',
        ]);
        Post::create($data);

        // Redirects to Last Page
        $totalPosts = Post::where('thread_id', $data['thread_id'])->count();
        $perPage = 10;
        $lastPage = ceil($totalPosts / $perPage);

        return redirect()->route('thread.showThread', [
            'thread' => $data['thread_id'],
            'page' => $lastPage,
        ])->with('message', 'Post created successfully.'); // Flash message to go to latest post

    }

    public function storeReply(Request $request)
    {
        $data = $request->validate([
            'content' => 'required|string',
            'thread_id' => 'required|numeric|exists:threads,id',
            'user_id' => 'required|numeric|exists:users,id',
            'parent_id' => 'required|numeric|exists:posts,id'
        ]);
        Post::create($data);

        // Redirects to Last Page
        $totalPosts = Post::where('thread_id', $data['thread_id'])->count();
        $perPage = 10;
        $lastPage = ceil($totalPosts / $perPage);

        return redirect()->route('thread.showThread', [
            'thread' => $data['thread_id'],
            'page' => $lastPage,
        ])->with('message', 'Post created successfully.'); // Flash message to go to latest post

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

    public function toggleReaction(Post $post)
    {
        $user = auth()->user();
        $post->toggleReaction($user);
        return redirect()->back();
    }
}
