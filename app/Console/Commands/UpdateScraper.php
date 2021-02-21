<?php

namespace App\Console\Commands;

use App\Models\Scraper;
use Illuminate\Console\Command;

class UpdateScraper extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'scraper:update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Atualiza um scraper existente';

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
        $this->info('Atualização de scraper');
        
        $actor = $this->ask('Ator do scraper');

        $credential = Scraper::where('actor', $actor)->first();

        if ($credential == null) {
            $this->error('Scraper não encontrado com ator: ' . $actor);
            return 1;
        }

        $this->info('Scrap:');
        $this->info($credential);

        $new_target = $this->ask('Target [enter para manter igual]');
        $new_actor = $this->ask('Ator [enter para manter igual]');
        $new_access_user = $this->ask('Usuário de acesso [enter para manter igual]');
        $new_access_password = $this->secret('Senha do usuário [enter para manter igual]');

        if(!empty($new_target)) {
            $credential->target = $new_target;
        }

        if(!empty($new_actor)) {
            $credential->actor = $new_actor;
        }

        if(!empty($new_access_user)) {
            $credential->access_user = $new_access_user;
        }

        if(!empty($new_access_password)) {
            $credential->access_password = $new_access_password;
        }

        if($credential->isDirty()) {
            $credential->save();
            $this->info('Scraper atualizado com sucesso!');
        } else {
            $this->line('Nada a ser atualizado, pelo visto.');
        }

        return 0;
    }
}
