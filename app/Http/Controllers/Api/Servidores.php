<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class Servidores extends Controller
{
    /**
     * Lista dos os alunos de um determinado curso.
     *
     * @return \Illuminate\Http\Response
     */
    public function busca(Request $request)
    {
        $alunos = [];
        return response()->json($alunos, 200, [], JSON_NUMERIC_CHECK);
    }
}
