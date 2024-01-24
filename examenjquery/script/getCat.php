<?php
// Establecer la conexión con la base de datos
$conexion = new mysqli('localhost', 'juanmaguerrero', 'dieciseis', 'juanmaguerrero');

// Verificar la conexión
if ($conexion->connect_error) {
    die('Error de conexión: ' . $conexion->connect_error);
}

$sql = "SELECT categoria_id, nombre FROM CategoriasEn";
$resultado = $conexion->query($sql);
$data = array();
while ($fila = $resultado->fetch_assoc()) {
    $data[] = array(
        "id" => $fila["categoria_id"],
        "categoria" => $fila["nombre"],
    );
}

$conexion->close();

echo json_encode($data);