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
            'title' => 'required|string|max:64',
            'description' => 'string|nullable',
            'parent_forum_id' => 'numeric|nullable',
        ]);
        Forum::create($data);
        return redirect()->route('admin.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Forum $forum, Request $request)
    {
        $sort = $request->query('sort', 'latest');

        $query = $forum->threads()
            ->withCount('posts') # post count
            ->withMax('posts', 'created_at') # latest post date 
            ->with('user'); # user data

        switch ($sort) {
            case 'recent':
                $query
                    ->orderByRaw('
                        CASE 
                            WHEN posts_max_created_at IS NULL THEN 1 
                            ELSE 0 
                        END ASC
                    ') // threads with posts = 0, no posts = 1
                    ->orderByDesc('posts_max_created_at')
                    ->orderByDesc('created_at');
                break;
            case 'latest':
                $query->orderBy('created_at', 'DESC');
                break;
            case 'title':
                $query->orderByRaw('LOWER(title) asc'); # ignore case
                break;
            case 'replies':
                $query
                    ->orderByRaw('
                    CASE 
                        WHEN posts_count = 0 THEN 1 
                        ELSE 0 
                    END ASC
                ') // threads with posts first (0 → has posts, 1 → no posts)
                    ->orderByDesc('posts_count')   // then sort by most posts
                    ->orderByDesc('created_at');   // finally, newest threads if tied
                break;
            case 'oldest':
                $query->orderBy('created_at', 'ASC');
                break;
            default:
                $query
                    ->orderByRaw('
                        CASE 
                            WHEN posts_max_created_at IS NULL THEN 1 
                            ELSE 0 
                        END ASC
                    ') // threads with posts = 0, no posts = 1
                    ->orderByDesc('posts_max_created_at')
                    ->orderByDesc('created_at');
                break;
        }

        $threads = $query->paginate(10)->withQueryString()->onEachSide(1);

        return Inertia::render('Forum/ForumPage', [
            'forum' => $forum,
            'threads' => $threads,
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
            'title' => 'required|string|max:64',
            'description' => 'string|nullable',
            'parent_forum_id' => 'numeric|nullable',
        ]);
        $forum->update([
            'title' => $request->input('title'),
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
