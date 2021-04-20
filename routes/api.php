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

// Informações sobre disciplinas
Route::get('/disciplinas', [Disciplinas::class, 'lista']);
Route::get('/disciplinas/codigos', [Disciplinas::class, 'codigos']);
Route::get('/disciplinas/{codigo}', [Disciplinas::class, 'info']);

Route::middleware(['auth:sanctum'])->group(function () {
    // Informações de cada aluno (histórico, etc)
    Route::get('/alunos/{entity}/historico', [Aluno::class, 'index']);
    Route::get('/alunos/{entity}', [Aluno::class, 'index']);

    // Informações sobre grupos de alunos (cursos, grupos, etc)
    Route::get('/cursos/{iduffs}/alunos', [Curso::class, 'alunos']);

    // Informações sobre servidores da UFFS
    Route::get('/servidores/busca', [Servidores::class, 'busca']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
