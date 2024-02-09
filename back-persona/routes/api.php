<?php

use Illuminate\Http\Request;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\BodyCarController;

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
Route::get('/user/{id}', [UserController::class, 'getData']);
Route::post('/user', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'authenticate']);
Route::put('/user/{id}', [UserController::class, 'update']);
Route::post('/vehicle', [VehicleController::class, 'register']);
Route::get('/status/list', [StatusController::class, 'listAll']);
Route::get('/settings/list', [SettingsController::class, 'listAll']);
Route::get('/bodycar/list', [BodyCarController::class, 'listAll']);
