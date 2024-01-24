<?php

$categoria = $_POST['categoria'];
// Establecer la conexión con la base de datos
$conexion = new mysqli('localhost', 'juanmaguerrero', 'dieciseis', 'juanmaguerrero');

// Verificar la conexión
if ($conexion->connect_error) {
    die('Error de conexión: ' . $conexion->connect_error);
}

$sql = "SELECT palabra FROM Palabras WHERE categoria_id = '$categoria'";
$resultado = $conexion->query($sql);

while ($fila = $resultado->fetch_assoc()) {
    $data[] = array(
        "palabra" => $fila["palabra"],
    );
}
echo json_encode($data);

$conexion->close();

