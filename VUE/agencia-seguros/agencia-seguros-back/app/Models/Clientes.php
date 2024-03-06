<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clientes extends Model
{
    use HasFactory;

    // protected $fillable = array(
    //     'nombre',
    //     'email',
    //     'telefono',
    //     'ciudad',
    //     'codigo_postal',
    //     'empresa'
    // );

    public function getNombre($id)
    {
        $cliente = Clientes::find($id);
        $nombre = $cliente->nombre;
        return $nombre;
    }

    public $timestamps = false;
}
