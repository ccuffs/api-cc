<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth;
use App\Http\Controllers\Api\Curso;
use App\Http\Controllers\Api\Aluno;
use App\Http\Controllers\Api\Historico;
use App\Http\Controllers\Api\Disciplinas;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// API endpoints
Route::post('/auth', [Auth::class, 'index']);
Route::get('/disciplinas', [Disciplinas::class, 'index']);
Route::get('/disciplinas/{codigo}', [Disciplinas::class, 'get']);
Route::get('/historico', [Historico::class, 'index']);
Route::get('/alunos/{entity}', [Aluno::class, 'index']);
Route::get('/cursos/{iduffs}/alunos', [Curso::class, 'alunos']);
Route::get('/cursos/{iduffs}/alunos/{matricula}', [Curso::class, 'aluno']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
