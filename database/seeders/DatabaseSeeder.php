<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Team;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $user = new User([
            'name' => 'Administrador',
            'email' => 'computacao.ch@uffs.edu.br',
            'password' => Hash::make('password')
        ]);
        
        $user->save();

        $team = new Team([
            'name' => 'apps',
            'personal_team' => true,
            'user_id' => $user->id
        ]);

        $team->save();
        $team->users()->attach($user->id, ['role' => 'admin']);
    }
}
