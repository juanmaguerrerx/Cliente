<?php

$id = $_POST['id'];
// Establecer la conexión con la base de datos
$conexion = new mysqli('localhost', 'juanmaguerrero', 'dieciseis', 'juanmaguerrero');

// Verificar la conexión
if ($conexion->connect_error) {
    die('Error de conexión: ' . $conexion->connect_error);
}

$sql = "SELECT SUM(puntos) AS puntosT FROM Partidas WHERE usuario_id = $id";
$resultado = $conexion->query($sql);

if ($resultado){

    while ($fila = $resultado->fetch_assoc()) {
        $data[] = array(
            "puntos" => $fila["puntosT"],
        );
    }
    echo json_encode($data);
}else {
    echo $conexion->error;
}


$conexion->close();

