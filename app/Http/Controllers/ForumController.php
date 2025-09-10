<?php

namespace App\Http\Controllers;

use App\Models\Forum;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ForumController extends Controller
{
    // ! Everything except index and show is admin only

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Forum::with(['children' => function ($query) {
            $query->withCount('threads'); 
        }])->withCount('threads')->whereNull('parent_forum_id')->get();

        return Inertia::render('Forum/Index', [
            'categories' => $categories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        return Inertia::render('Admin/CreateForum');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
       $data =  $request->validate([
            'title'=>'required|string|max:64',
            'slug'=>'required|string|alpha_dash',
            'description'=>'string|nullable',
            'parent_forum_id'=>'numeric|nullable',
        ]);
        Forum::create($data);
        return redirect()->route('admin.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Forum $forum)
    {
        $user = auth()->user();
        $threads = $forum->threads()
            ->withCount('posts')
            ->with('user')
            ->latest()
            ->paginate(10); // 10 threads per page
        
        return Inertia::render('Forum/ForumPage', [
            'forum' => $forum,
            'threads'=> $threads,
            'user' => $user
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Forum $forum)
    {
        //
        return Inertia::render('Admin/EditForum', [
            'forum' => $forum
        ]);
    }
    
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Forum $forum)
    {
        //
        $request->validate([
            'title'=>'required|string|max:64',
            'slug'=>'required|string|alpha_dash',
            'description'=>'string|nullable',
            'parent_forum_id'=>'numeric|nullable',
        ]);
        $forum->update([
            'title' => $request->input('title'),
            'slug' => $request->input('slug'),
            'description' => $request->input('description'),
            'parent_forum_id' => $request->input('parent_forum_id'),
        ]);
        return redirect()->route(route: 'admin.index');
 
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Forum $forum)
    {
        $forum->delete();
        return redirect()->route(route: 'admin.index');
    }
}
