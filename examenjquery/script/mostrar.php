<?php

$cat = $_POST["cat"];
// Establecer la conexión con la base de datos
$conexion = new mysqli('localhost', 'juanmaguerrero', 'dieciseis', 'juanmaguerrero');

// Verificar la conexión
if ($conexion->connect_error) {
    die('Error de conexión: ' . $conexion->connect_error);
}

$sql = "SELECT titulo, URL FROM Enlaces WHERE sub_id = (SELECT sub_id FROM Subcategorias WHERE nombre = '$cat' ";
$resultado = $conexion->query($sql);
$data = array();
while ($fila = $resultado->fetch_assoc()) {
    $data[] = array(
        "titulo" => $fila["titulo"],
        "url" => $fila["URL"],
    );
}

$conexion->close();

echo json_encode($data);