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

// Authentication for users
Route::post('auth/login', 'Api\\AuthController@login');

Route::group(['middleware' => ['apiJwt']], function() {
    Route::post('auth/logout', 'Api\\AuthController@logout');

    Route::group(['middleware' => ['role:admin|user']], function () {
        Route::resource('employees', 'Api\\EmployeeController');
        Route::get('/user/findByEmail/{email}', 'Api\\UserController@findByEmail');
        Route::get('/user/{id}', 'Api\\UserController@show');
        Route::resource('companies', 'Api\\CompanyController');
    });

});
