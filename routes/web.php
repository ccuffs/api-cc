<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Misc
Route::get('/info/users', 'InfoController@users')->name('info.users');

if (App::environment('local')) {
    Route::get('/test', 'TestController@index');
}

Route::get('/', function () {
    return view('welcome');
});
