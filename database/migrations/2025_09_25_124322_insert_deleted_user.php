<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use App\Models\User;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //
        DB::table('users')->insert([
            'id' => User::DELETED_USER_ID,
            'name' => 'DELETED',
            'email' => '',
            'password' => '',
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('users')->where('id', User::DELETED_USER_ID)->delete();
    }
};
