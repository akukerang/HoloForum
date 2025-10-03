<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;

class MakeUserAdmin extends Command
{

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:make-admin {username}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Gives user the admin role.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
        $username = $this->argument('username');
        $user = User::where('name', $username)->first();

        if (! $user) {
            $this->error('No user found.');
        } else {
            $user->role = 'admin';
            $user->save();

            $this->info('User successfully set as admin');
        }
    }
}
