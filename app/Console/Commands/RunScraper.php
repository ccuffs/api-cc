<?php

namespace App\Console\Commands;

use App\Models\Entity;
use App\Models\Scraper;
use App\Support\Facades\SgaScraper;
use Illuminate\Console\Command;
use App\Models\User;
use App\Models\Team;
use Illuminate\Support\Facades\DB;

class RunScraper extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'scraper:run {scraper : id do scraper a ser rodado}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Roda um scraper';

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
        $scraperId = $this->argument('scraper');

        $scraper = Scraper::find($scraperId);

        if (!$scraper) {
            $this->error("Scraper com id $scraperId não encontrado.");    
            return 1;
        }

        $this->comment('Rodando scraper [id=' . $scraper->id . ', target=' . $scraper->target . ', actor=' . $scraper->actor . ']');

        $credenciais = [
            'usuario' => $scraper->access_user,
            'senha' => $scraper->access_password,
        ];

        $alunos = SgaScraper::usando($credenciais)->alunos()->get();

        try {
            DB::beginTransaction();

            foreach($alunos as $aluno) {
                $dados = [
                    'eid' => $aluno->matricula,
                    'name' => $aluno->nome,
                    'type' => 'person',
                    'data' => json_encode($aluno),
                    'created_at' => now(),
                    'updated_at' => now()
                ];
                $entity = Entity::updateOrCreate($dados);
                $entity->scrapers()->attach($scraper->id);
            };

            DB::commit();
        } catch (\PDOException $e) {
            DB::rollBack();

            $this->error("Problema ao inserir dados obtidos pelo scraper.");    
            $this->line($e);

            return 2;
        }

        $this->info('Scraper finalizado com sucesso!');
        return 0;
    }
}
