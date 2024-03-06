<?php

namespace App\Http\Controllers;

use App\Models\Clientes;
use App\Models\Polizas;
use Illuminate\Http\Request;

class PolizasCtrl extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $cliente =  new Clientes;
        $polizas = Polizas::all();
        $poliza = [];
        foreach ($poliza as $polizas) {
            $poliza['cliente'] = $cliente->getNombre($poliza['cliente_id']);
        }
        return response()->json($polizas);
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
            $poliza = new Polizas();

            $poliza->cliente_id = $request->cliente_id;
            $poliza->numero = $request->numero;
            $poliza->estado = $request->estado;
            $poliza->importe = $request->importe;
            $poliza->notas = $request->notas;

            $poliza->save();

            return response()->json($poliza, 200);

        } catch (\Exception $e) {
            return response()->json($e->getMessage(), 500); // Cambiado el código de estado a 500 para indicar un error interno del servidor
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
        $polizas = Polizas::find($id);

        if ($polizas) {
            return response()->json($polizas);
        } else {
            return response()->json(['message' => 'Poliza no encontrada con id: ' . $id], 404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Polizas $polizas)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //
        try {
            $poliza = Polizas::find($id);


            $poliza->cliente_id = $request->cliente_id;
            $poliza->numero = $request->numero;
            $poliza->estado = $request->estado;
            $poliza->importe = $request->importe;
            $poliza->notas = $request->notas;


            // $cliente->update($clienteEdit);
            $poliza->save();
            return response()->json($poliza, 200);
        } catch (\Exception $e) {
            return response()->json($e->getMessage(), 500); // Cambiado el código de estado a 500 para indicar un error interno del servidor
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Polizas $polizas)
    {
        //
        // Elimina el cliente
        Polizas::destroy($polizas);
    
        // Retorna una respuesta de éxito
        return response()->json($polizas);
    }
}
