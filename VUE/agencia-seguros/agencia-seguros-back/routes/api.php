<?php

use App\Http\Controllers\ClientesCtrl;
use App\Http\Controllers\PagosCtrl;
use App\Http\Controllers\PolizasCtrl;
use App\Http\Controllers\ProvinciasCtrl;
use App\Http\Controllers\MunicipiosCtrl;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\MultipleItemsFoundException;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/**
 * Table clientes
 * methods: GET,POST,PATCH,DELETE
 */
Route::apiResource('clientes',ClientesCtrl::class);

/**
 * Table polizas
 * methods: methods: GET,POST,PATCH,DELETE
 */
Route::apiResource('polizas',PolizasCtrl::class);

/**
 * Table pagos
 * methods: GET,POST,PATCH,DELETE
 */
Route::apiResource('pagos',PagosCtrl::class);

/**
 * Table PROVINCIAS
 * method: GET
 */
Route::apiResource('provincias', ProvinciasCtrl::class);

/**
 * Table MUNICIPIOS
 * method: POST
 */
Route::apiResource('municipios',MunicipiosCtrl::class);