<?php

namespace Database\Seeders;

use App\Models\Entity;
use App\Models\Scraper;
use Illuminate\Database\Seeder;

class DevSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $entity = Entity::create([
            'eid' => 'teste',
            'name' => 'teste',
            'type' => 'person',
            'data' => '{}'
        ]);

        $scraper = Scraper::create([
            'target' => 'professor.uffs.edu.br',
            'actor' => 'computacao.ch',
            'access_user' => '',
            'access_password' => ''
        ]);

        $entity->scrapers()->attach($entity->id);
    }
}
