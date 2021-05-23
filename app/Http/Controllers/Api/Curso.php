<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Scraper;
use App\Support\Facades\SgaScraper;
use Illuminate\Support\Facades\Cache;

class Curso extends Controller
{
    protected function getCredenciais($iduffs)
    {
        $scraper = Scraper::where('actor', $iduffs)->first();

        if(!$scraper) {
            throw new \Exception("O curso identificado por '$iduffs' não foi encontrado.");
        }

        $credenciais = [
            'usuario' => $scraper->access_user,
            'senha' => $scraper->access_password
        ];

        return $credenciais;
    }

    /**
     * Lista dos os alunos de um determinado curso.
     *
     * @return \Illuminate\Http\Response
     */
    public function conclusoes(Request $request, $iduffs)
    {
        $credenciais = $this->getCredenciais($iduffs);
        $info = SgaScraper::usando($credenciais)->conclusoes()->get();

        return $this->json($info);
    }

    /**
     * Lista dos os alunos de um determinado curso.
     *
     * @return \Illuminate\Http\Response
     */
    public function alunos(Request $request, $iduffs)
    {
        $credenciais = $this->getCredenciais($iduffs);
        $info = SgaScraper::usando($credenciais)->alunos()->get();

        return $this->json($info);
    }
}
