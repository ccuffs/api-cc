<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Team;

class CreateApp extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:create';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Cria uma nova aplicação';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('Criação de nova aplicação');
        
        $name = $this->ask('Nome da aplicação');
        $email = $this->ask('E-mail da aplicação');
        $password = $this->secret('Senha da aplicação');

        if (!$this->confirm('Confirma criação?')) {
            return 1;
        }

        $user = new User([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password)
        ]);
        
        $user->save();
        $app_team = Team::where('name', 'apps')->first();
        $user->ownedTeams()->save($app_team);

        $this->info('Aplicação criada com sucesso!');

        return 0;
    }
}
