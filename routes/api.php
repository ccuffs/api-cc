<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// Public routes 
Route::get('/', function () {
    return response()->json(['message' => 'Hello world, API!']);
});

// Defaults
Route::post('/register', [
    'as' => 'register',
    'uses' => 'AuthController@register',
]);

Route::get('/verify/{token}', [
    'as' => 'verify',
    'uses' => 'AuthController@verify'
]);

// Auth routes
Route::middleware('auth')->group(function () {
    Route::post('/login', [
        'as' => 'login',
        'uses' => 'AuthController@login',
    ]);

    // Password reset
    Route::post('/password/forgot', [
        'as' => 'password.forgot',
        'uses' => 'AuthController@forgotPassword'
    ]);
    Route::post('/password/recover/{token}', [
        'as' => 'password.recover',
        'uses' => 'AuthController@recoverPassword'
    ]);

    // Protected user endpoint
    Route::get('/user', [
        'uses' => 'AuthController@getUser',
        'as' => 'user',
        'middleware' => 'auth'
    ]);
});

// Protected routes
Route::middleware('auth')->group(function () {
    
});
