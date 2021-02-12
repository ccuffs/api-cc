<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class Curso extends Controller
{
    protected function runSgaScraper()
    {
        $output=null;
        $retval=null;
        exec('whoami', $output, $retval);
    }


    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:sanctum');
    }

    /**
     * Lista dos os alunos de um determinado curso.
     *
     * @return \Illuminate\Http\Response
     */
    public function alunos($idUFFSCurso)
    {
        $alunos = [];
        return response()->json($alunos, 200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Lista informações conhecidas sobre
     *
     * @return \Illuminate\Http\Response
     */
    public function aluno($idUFFSCurso, $matricula)
    {
        $aluno = [];
        return response()->json($aluno, 200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * 
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $items = [];
        return $items;
    }
}
