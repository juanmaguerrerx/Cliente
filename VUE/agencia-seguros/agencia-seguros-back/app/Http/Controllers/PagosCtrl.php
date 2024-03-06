<?php

namespace App\Http\Controllers;

use App\Models\Pagos;
use App\Models\Polizas;
use Illuminate\Http\Request;

class PagosCtrl extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return response()->json(Pagos::all());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        try {
            $pagos = new Pagos();

            $pagos->num_poliza = $request->num_poliza;
            $pagos->notas = $request->notas;
            $pagos->importe = $request->importe;
            $pagos->fecha_pago = $request->fecha_pago;
            
            $pagos->save();

            return response()->json($pagos, 201);
        } catch (\Exception $e) {
            return response()->json($e);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Pagos $pagos)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pagos $pagos)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pagos $pagos)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pagos $pagos)
    {
        //
    }
}
