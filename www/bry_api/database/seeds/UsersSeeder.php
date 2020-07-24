<?php

use Illuminate\Database\Seeder;
use App\User;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $userAdmin = User::create([
            'name' => 'admin',
            'login' => 'admin',
            'email' => 'admin@admin.com',
            'password' => bcrypt('12345678'),
        ]);
        $userAdmin->assignRole('admin');

        $userUser = User::create([
            'name' => 'user',
            'login' => 'user',
            'email' => 'user@user.com',
            'password' => bcrypt('12345678'),
        ]);
        $userUser->assignRole('user');

        $userGuest = User::create([
            'name' => 'guest',
            'login' => 'guest',
            'email' => 'guest@guest.com',
            'password' => bcrypt('12345678'),
        ]);
        $userGuest->assignRole('user');
    }
}
