<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Entity;
use App\Support\Facades\SgaScraper;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class Aluno extends Controller
{
    /**
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Entity $entity)
    {
        $data = json_decode($entity->data);
        $scraper = $entity->scrapers->first();

        if(!$scraper) {
            return response()->json(['error' => 'Entidade não possui scraper registrado para uso.'], 500);
        }

        $credenciais = [
            'usuario' => $scraper->access_user,
            'senha' => $scraper->access_password,
            'matricula' => $data->matricula
        ];

        $cacheKey = 'aluno:' . $data->matricula . ':' . $scraper->actor;
        $cacheTtl = now()->addDays(2);

        $info = Cache::remember($cacheKey, $cacheTtl, function() use ($credenciais) {
            return SgaScraper::usando($credenciais)->historico()->get();
        });

        return response()->json($info, 200, [], JSON_NUMERIC_CHECK);
    }
}
