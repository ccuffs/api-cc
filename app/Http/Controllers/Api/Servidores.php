<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Utils\Sanitizer;

class Servidores extends Controller
{
    /**
     * 
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function busca(Request $request)
    {
        $nome = $request->get('nome', '');
        $iduffs = $request->get('iduffs', '');
        $limit = $request->get('limit', 10);

        $query = DB::connection('pessoas')->table('personnel')->limit($limit);

        if (!empty($nome)) {
            $query->whereRaw('name LIKE ?', ['%' . Sanitizer::clean($nome) .'%']);
        }

        if (!empty($iduffs)) {
            $query->whereRaw('uid LIKE ?', ['%' . Sanitizer::clean($iduffs) .'%']);
        }        
        
        $personnel = $query->get();
        $result = [];

        foreach($personnel as $person) {
            $name = Sanitizer::clean($person->name);

            $item = new \stdClass();
            $item->nome = ucwords($name);
            $item->iduffs = $person->uid;
            $item->email = $person->email;
            $item->telefone = $person->phone;
            $item->voip = $person->voip;
            $item->departamento = (object) [
                'nome' => $person->department_name,
                'iniciais' => $person->department_initials,
                'endereco' => $person->department_address,
            ];
            $item->cargo = $person->job;
            $item->notas = $person->notes;

            $result[$person->uid] = $item;
        }

        $values = array_values($result);
        return response()->json($values, 200, [], JSON_NUMERIC_CHECK);
    }    
}
