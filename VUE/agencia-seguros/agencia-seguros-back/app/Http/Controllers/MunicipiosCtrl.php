<?php

namespace App\Http\Controllers;

use App\Models\Municipios;
use Illuminate\Http\Request;
use App\Models\Provincias;

class MunicipiosCtrl extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Municipios::all();
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
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Municipios $municipios)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Municipios $municipios)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Municipios $municipios)
    {
        //
    }
}