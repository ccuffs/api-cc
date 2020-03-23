<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class InfoController extends Controller
{

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function users()
    {
        return response()->json([
            ['username' => 'fernando.bevilacqua', 'email' => 'fernando.bevilacqua@uffs.edu.br', 'name' => 'Fernando Bevilacqua'],
            ['username' => 'bevilacqua', 'email' => 'fernando.bevilacqua@uffs.edu.br', 'name' => 'Fernando "Dovyski" Bevilacqua'],
            ['username' => 'lcaimi', 'email' => 'lcaimi@uffs.edu.br', 'name' => 'Luciano Lores Caimi'],
            ['username' => 'duarte', 'email' => 'duarte@uffs.edu.br', 'name' => 'Denio Duarte'],
        ]);
    }
}
