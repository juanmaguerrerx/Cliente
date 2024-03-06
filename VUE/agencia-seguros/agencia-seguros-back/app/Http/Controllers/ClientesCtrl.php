<?php

namespace App\Http\Controllers;

use App\Models\Clientes;
use App\Models\Polizas;
use Illuminate\Http\Request;

class ClientesCtrl extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Clientes::all());
        //
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

        try {
            $cliente = new Clientes();

            $cliente->nombre = $request->nombre;
            $cliente->email = $request->email;
            $cliente->telefono = $request->telefono;
            $cliente->ciudad = $request->ciudad;
            $cliente->codigo_postal = $request->codigo_postal;
            $cliente->empresa = $request->empresa;

            $cliente->save();

            return response()->json($cliente, 201);
        } catch (\Exception $e) {
            return response()->json($e);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {

        //
        $cliente = Clientes::find($id);

        if ($cliente) {
            return response()->json($cliente);
        } else {
            return response()->json(['message' => 'Cliente no encontrado con id: ' . $id], 404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Clientes $clientes)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $cliente = Clientes::find($id);


            $cliente->nombre = $request->nombre;
            $cliente->email = $request->email;
            $cliente->telefono = $request->telefono;
            $cliente->ciudad = $request->ciudad;
            $cliente->codigo_postal = $request->codigo_postal;
            $cliente->empresa = $request->empresa;

            // $cliente->update($clienteEdit);
            $cliente->save();
            return response()->json($cliente, 200);
        } catch (\Exception $e) {
            return response()->json($e->getMessage(), 500); // Cambiado el código de estado a 500 para indicar un error interno del servidor
        }
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($clientes)
    {

        // Elimina el cliente
        Clientes::destroy($clientes);
        

        // Retorna una respuesta de éxito
        return response()->json($clientes);
    }
}
