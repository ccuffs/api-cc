<?php

namespace App\Console\Commands;

use App\Models\ScrapingCredential;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Team;

class CreateScrap extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'scrap:create';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Cria um novo scraper';

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
        $this->info('Criação de novo scraper');
        
        $target = $this->ask('Target (ex. professor.uffs.edu.br)');
        $actor = $this->ask('Ator (ex. computacao.ch)');
        $access_user = $this->ask('Usuário de acesso');
        $access_password = $this->secret('Senha do usuário de acesso');

        $this->line(" Scrap:\n  target = $target\n  actor = $actor\n  access_user = $access_user");

        if (!$this->confirm('Confirma criação?')) {
            return 1;
        }

        $credential = ScrapingCredential::create([
            'id' => null,
            'target' => $target,
            'actor' => $actor,
            'access_user' => $access_user,
            'access_password' => $access_password
        ]);

        $this->info('Scrap criado com sucesso!');

        return 0;
    }
}
