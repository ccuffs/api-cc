<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use \Firebase\JWT\JWT;
use App\Http\Controllers\Controller;

class Auth extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('doNotCacheResponse');
    }

    private function generatePassport($uid, $email) {
        $ttl_days = 7 * 24 * 60 * 60; // TODO: add config for this
        $key = config('app.key');
        $payload = array(
            'uid' => $uid,
            'email' => $email,
            'iss' => 'https://api.uffs.cc',
            'iat' => time(),
            'exp' => time() + $ttl_days
        );

        $jwt = JWT::encode($payload, $key);
        return $jwt;
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
            'passport' => $this->generatePassport($info->uid, $info->email),
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
