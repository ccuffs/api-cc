<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Entity;
use App\Support\Facades\SgaScraper;

class Aluno extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:sanctum');
    }

    /**
     * 
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Entity $entity)
    {
        $credenciais = [
            'usuario' => '',
            'senha' => '',
        ];
        $alunos = SgaScraper::usando($credenciais)->alunos()->get();

        return response()->json($alunos, 200, [], JSON_NUMERIC_CHECK);
    }
}
