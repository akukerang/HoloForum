<?php

namespace App\Http\Controllers;

use App\Models\Forum;
use App\Models\Post;
use App\Models\Thread;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ThreadController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(Forum $forum)
    {
        return Inertia::render('Thread/CreateThread', [
            'forum' => $forum
        ]);
    }

    public function adminCreate()
    {
        return Inertia::render('Admin/CreateThread');
    }
    /**
     * Store a newly created resource in storage.
     */
    public function adminStore(Request $request) // Admin Store
    {
        $data = $request->validate([
            'title' => 'required|string|max:64',
            'forum_id' => 'required|numeric|exists:forums,id',
            'user_id' => 'required|numeric|exists:users,id',
        ]);
        Thread::create($data);
        return redirect()->route('admin.index');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:64',
            'forum_id' => 'required|numeric|exists:forums,id',
            'user_id' => 'required|numeric|exists:users,id',
            'content' => [
                'required',
                function ($attribute, $value, $fail) {
                    if (trim(strip_tags($value)) === '') {
                        $fail('The ' . $attribute . ' field is required.');
                    }
                },
            ],
        ]);

        $thread = Thread::create($data);
        $thread->posts()->create([
            'user_id' => $data['user_id'],
            'content' => $data['content'],
        ]);
        return redirect()->route('forum.forumShow', $thread->forum);
    }

    /**
     * Display the specified resource.
     */
    public function show(Thread $thread, Request $request)
    {

        $thread->load('user');
        $thread->load('forum');

        $query = $thread->posts()->with(['user', 'parent'])->withCount('reactions');
        $sort = $request->query('sort', 'oldest');
        switch ($sort) {
            case 'latest':
                $query->orderBy('created_at', 'DESC');
                break;
            case 'oldest':
                $query->orderBy('created_at', 'ASC');
                break;
            case 'reactions':
                $query->orderBy('reactions_count', 'DESC');
                break;
            default:
                $query->orderBy('created_at', 'ASC');
                break;
        }

        $posts = $query->paginate(10)->onEachSide(1)->withQueryString();

        return Inertia::render('Thread/ShowThread', [
            'thread' => $thread,
            'posts' => $posts,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Thread $thread)
    {
        return Inertia::render('Thread/EditThread', [
            'thread' => $thread
        ]);
    }

    public function update(Request $request, Thread $thread)
    {
        $user = auth()->user();
        // Ensure the authenticated user is the owner of the thread
        if ($user->id !== $thread->user_id) {
            abort(403, 'Unauthorized action.');
        }
        $data = $request->validate([
            'title' => 'required|string|max:64',
        ]);
        $thread->update($data);
        return redirect()->route('forum.forumShow', $thread->forum);
    }


    public function adminEdit(Thread $thread)
    {
        return Inertia::render('Admin/EditThread', [
            'thread' => $thread
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function adminUpdate(Request $request, Thread $thread)
    {
        //
        $data = $request->validate([
            'title' => 'required|string|max:64',
            'forum_id' => 'required|numeric|exists:forums,id',
            'user_id' => 'required|numeric|exists:users,id',
        ]);
        $thread->update($data);
        return redirect()->route('admin.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function adminDestroy(Thread $thread)
    {
        //
        $thread->posts()->delete(); // Delete associated posts first
        $thread->delete();
        return redirect()->route('admin.index');
    }

    public function modDestroyThread(Thread $thread)
    {
        $thread->posts()->delete();
        $thread->delete();
        return redirect()->back();
    }

    public function destroy(Thread $thread)
    {
        $user = auth()->user();
        // Ensure the authenticated user is the owner of the thread
        if ($user->id !== $thread->user_id) {
            abort(403, 'Unauthorized action.');
        }

        // Delete the thread
        $thread->posts()->delete(); // Delete associated posts first
        $thread->delete();

        return redirect()->route('forum.forumShow', $thread->forum);
    }

    // Lock Thread
    public function modToggleLock(Thread $thread)
    {
        if ($thread->locked) {
            $thread->locked = false;
        } else {
            $thread->locked = true;
        }
        $thread->save();
        return redirect()->back();
    }

    public function searchPage()
    {
        $forums = Forum::select('title', 'slug')->orderBy('id', 'asc')->get();
        return Inertia::render(
            'Search/Search',
            [
                'forums' => $forums
            ]
        );
    }

    public function search(Request $request)
    {
        $data = $request;

        // Stores the parameters for pagination, null ones default to empty
        $params = $request->only(['keywords', 'user', 'forum', 'results', 'sort']);
        foreach ($params as $k => $v) {
            if ($v === null) {
                $params[$k] = '';
            }
        }

        // Check if forum is a forum or category (no parent_id)
        $forum_ids = null;
        if (!empty($data['forum'])) {
            $temp = Forum::where('slug', $data['forum'])->first();
            if (empty($temp)) { // no matching forum (maybe unnecessary because of exists check)
                $forum_ids = null;
            } else if ($temp->parent_forum_id === null) { // category
                $forum_ids = Forum::where('parent_forum_id', $temp->id)->pluck('id');
            } else { //specific forum
                $forum_ids = [$temp->id]; // expects array
            }
        }



        if ($data['results'] === 'posts') { // return posts
            $query = Post::query();

            // Checks post content and thread title for keywords
            $query->when($data['keywords'], function ($q, $keywords) {
                $q->where(function ($q2) use ($keywords) {
                    $q2->where('content', 'like', "%{$keywords}%")
                        ->orWhereHas('thread', function ($q3) use ($keywords) {
                            $q3->where('title', 'like', "%{$keywords}%");
                        });
                });
            });

            // Checks by parent user
            $query->when($data['user'], function ($q, $name) {
                $q->whereHas('user', function ($q) use ($name) {
                    $q->where('name', $name);
                });
            });

            // Checks by parent forum id gotten from thread
            if ($forum_ids) {
                $query->whereHas('thread', function ($q2) use ($forum_ids) {
                    $q2->whereIn('forum_id', $forum_ids);
                });
            }

            // Sort posts

            $query = $query->with(['user:id,avatar,name,bio,status,role', 'parent'])->withCount('reactions')->with('thread:id,title');
            $sort = $request->query('sort', 'oldest');
            switch ($sort) {
                case 'latest':
                    $query->orderBy('created_at', 'DESC');
                    break;
                case 'oldest':
                    $query->orderBy('created_at', 'ASC');
                    break;
                case 'reactions':
                    $query->orderBy('reactions_count', 'DESC');
                    break;
                default:
                    $query->orderBy('created_at', 'ASC');
                    break;
            }

            $results = $query->paginate(10)->onEachSide(1)->appends($params);


            return Inertia::render(
                'Search/Results',
                [
                    'posts' => $results,
                ]
            );
        } else if ($data['results'] === 'threads') {
            $query = Thread::query();

            // Check thread title for keywords
            $query->when($data['keywords'], function ($q, $keywords) {
                $q->where('title', 'like', "%{$keywords}%")
                    ->orWhereHas('posts', function ($q2) use ($keywords) {
                        $q2->where('content', 'like', "%{$keywords}%");
                    });
            });

            // Check author by user
            $query->when($data['user'], function ($q, $name) {
                $q->whereHas('user', function ($q2) use ($name) {
                    $q2->where('name', $name);
                });
            });

            // Forum/category restriction
            if ($forum_ids) {
                $query->whereIn('forum_id', $forum_ids);
            }

            // Sort Threads
            $sort = $request->query('sort', 'recent');

            $query = $query
                ->withCount('posts') # post count
                ->with('latestPost.user:id,avatar,name')
                ->withMax('posts', 'created_at') # latest post date 
                ->with('user:id,name'); # user data

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

            $results = $query->paginate(perPage: 10)->onEachSide(1)->appends($params);


            return Inertia::render(
                'Search/Results',
                [
                    'threads' => $results,
                ]
            );
        }
    }
}
