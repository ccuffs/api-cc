<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Utils\Sanitizer;

class Servidores extends Controller
{
    protected function findServidores(array $campos = [], $limit = 0) {
        $query = DB::connection('pessoas')->table('personnel');
        
        if ($limit > 0) {
            $query->limit($limit);
        }

        if (isset($campos['nome'])) {
            $query->whereRaw('name LIKE ?', ['%' . Sanitizer::clean($campos['nome']) .'%']);
        }

        if (isset($campos['uid'])) {
            $query->whereRaw('uid LIKE ?', ['%' . Sanitizer::clean($campos['uid']) .'%']);
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

            $result[] = $item;
        }

        $values = array_values($result);
        return $values;
    }

    /**
     * 
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function lista(Request $request)
    {
        $values = $this->findServidores();
        return response()->json($values, 200, [], JSON_NUMERIC_CHECK);
    } 

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

        $values = $this->findServidores([
            'nome' => $nome,
            'uid' => $iduffs
        ], $limit);

        return response()->json($values, 200, [], JSON_NUMERIC_CHECK);
    }    
}
