<?php

namespace App\Http\Controllers;

use App\Models\Forum;
use App\Models\Thread;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ThreadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Forum $forum)
    {
        $user = auth()->user();
        return Inertia::render('Thread/CreateThread', [
            'user' => $user,
            'forum' => $forum
        ]);
    }

    public function adminCreate(){
        return Inertia::render('Admin/CreateThread');
    }
    /**
     * Store a newly created resource in storage.
     */
    public function adminStore(Request $request) // Admin Store
    {
        $data = $request->validate([
            'title'=>'required|string|max:64',
            'forum_id'=>'required|numeric|exists:forums,id',
            'user_id'=>'required|numeric|exists:users,id',
        ]);
        Thread::create($data);
        return redirect()->route('admin.index');
    }

    public function store(Request $request){
        $data = $request->validate([
            'title'=>'required|string|max:64',
            'forum_id'=>'required|numeric|exists:forums,id',
            'user_id'=>'required|numeric|exists:users,id',
            'content'=>'required|string',
        ]);

        $thread = Thread::create($data);
        $thread->posts()->create([
            'user_id' => $data['user_id'],
            'content' => $data['content'],
        ]);

        return redirect()->route('forum.forumShow', $data['forum_id']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Thread $thread)
    {
        $thread->load('user');
        $thread->load('forum');
        $thread->load('posts.user'); // load posts and their users
        return Inertia::render('Thread/ShowThread', [
            'thread' => $thread
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Thread $thread)
    {
        //
    }

    public function adminEdit(Thread $thread){
        return Inertia::render('Admin/EditThread', [
            'thread' => $thread
        ]);
    }   

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Thread $thread)
    {
        //
        $data = $request->validate([
            'title'=>'required|string|max:64',
            'forum_id'=>'required|numeric|exists:forums,id',
            'user_id'=>'required|numeric|exists:users,id',
        ]);
        $thread->update($data);
        return redirect()->route('admin.index');    
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Thread $thread)
    {
        //
        $thread->delete();
        return redirect()->route('admin.index');
    }
}
