<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;


class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|alpha_num:ascii|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect()->intended(route('home', absolute: false));
    }

    # Admin Functions

    public function destroy(User $user): RedirectResponse
    {

        // Deletes avatar if exists
        if ($user->avatar) {
            Storage::disk('public')->delete($user->avatar);
            $user->avatar = null;
            $user->save();
        }

        $user->threads()->update(['user_id' => User::DELETED_USER_ID]);
        $user->posts()->update(['user_id' => User::DELETED_USER_ID]);

        $user->delete();

        return redirect()->route('admin.index');
    }


    public function edit(User $user): Response
    {
        return Inertia::render('Admin/EditUser', [
            'user' => $user
        ]);
    }

    public function update(Request $request, User $user): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'alpha_num:ascii', 'max:255'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($user->id),
            ],
            'role' => 'required|in:user,admin,moderator,banned',
        ]);
        $user->role = $data['role']; // Not sure about having role in the fillable array, so doing this for now
        $user->save();
        $user->update($data);
        return redirect()->route('admin.index');
    }

    public function modToggleBan(User $user): RedirectResponse
    {
        //! Can't ban admins or mods
        if ($user->role === 'admin' || $user->role === 'moderator') {
            return redirect()->back();
        }

        // Toggles Ban
        if ($user->role === 'banned') {
            $user->role = 'user';
        } else {
            $user->role = 'banned';
        }

        $user->save();
        return redirect()->back();
    }
}
