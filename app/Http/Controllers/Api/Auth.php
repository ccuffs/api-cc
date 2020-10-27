<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class Auth extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct() {
        // This controller is open to the inter-webz.
    }

    private function generatePassport() {
        return '';
    }

    /**
     * 
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $this->validate($request, [
            'user' => 'required',
            'password' => 'required',
        ]);

        $input = $request->all();
        $auth = new \CCUFFS\Auth\AuthIdUFFS();
        $info = $auth->login($input);

        if($info === null) {
            return response()->json([
                'message' => 'Usuário ou senha incorretos',
                'errors' => [
                    'general' => ['Provided user or password is invalid']
                ]
            ]);
        }

        return response()->json([
            'token' => $info->token_id,
            'passport' => $this->generatePassport(),
            'user' => [
                'name' => ucwords(strtolower($info->name)),
                'email' => $info->email,
                'username' => $info->username,
                'cpf' => $info->cpf,
                'uid' => $info->uid,
                'pessoa_id' => $info->pessoa_id
            ]
        ]);
    }
}
