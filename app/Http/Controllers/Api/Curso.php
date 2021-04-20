<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class Curso extends Controller
{
    /**
     * Lista dos os alunos de um determinado curso.
     *
     * @return \Illuminate\Http\Response
     */
    public function alunos(Request $request, $iduffs)
    {
        $alunos = [];
        return response()->json($alunos, 200, [], JSON_NUMERIC_CHECK);
    }
}
