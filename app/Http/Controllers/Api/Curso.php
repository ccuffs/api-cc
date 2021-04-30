<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Scraper;
use App\Support\Facades\SgaScraper;
use Illuminate\Support\Facades\Cache;

class Curso extends Controller
{
    /**
     * Lista dos os alunos de um determinado curso.
     *
     * @return \Illuminate\Http\Response
     */
    public function alunos(Request $request, $iduffs)
    {
        $scraper = Scraper::where('actor', $iduffs)->first();

        if(!$scraper) {
            return response()->json(['error' => "O curso identificado por '$iduffs' não foi encontrado."], 500);
        }

        $credenciais = [
            'usuario' => $scraper->access_user,
            'senha' => $scraper->access_password
        ];

        $cacheKey = 'alunos:' . $iduffs;
        $cacheTtl = now()->addDays(2);

        $info = Cache::remember($cacheKey, $cacheTtl, function() use ($credenciais) {
            return SgaScraper::usando($credenciais)->alunos()->get();
        });

        return response()->json($info, 200, [], JSON_NUMERIC_CHECK);
    }
}
