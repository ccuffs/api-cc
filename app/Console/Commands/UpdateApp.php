<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UpdateApp extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Atualiza uma aplicação existente';

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
        $this->info('Atualização de aplicação');
        
        $email = $this->ask('E-mail da aplicação');
        $user = User::where('email', $email)->first();

        if ($user == null) {
            $this->error('Aplicação não encontrada com o e-mail: ' . $email);
            return 1;
        }

        $new_name = $this->ask('Nome da aplicação [enter para manter igual]');
        $new_email = $this->ask('E-mail da aplicação [enter para manter igual]');
        $new_password = $this->secret('Senha da aplicação [enter para manter igual]');

        if(!empty($new_name)) {
            $user->name = $new_name;
        }

        if(!empty($new_email)) {
            $user->email = $new_email;
        }

        if(!empty($new_password)) {
            $user->password = Hash::make($new_password);
        }          

        if($user->isDirty()) {
            $user->save();
            $this->info('Aplicação atualizada com sucesso!');
        } else {
            $this->line('Nada a ser atualizado, pelo visto.');
        }

        return 0;
    }
}
