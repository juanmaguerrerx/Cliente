<?php

$categoria = $_POST["categoria"];
// Establecer la conexión con la base de datos
$conexion = new mysqli('localhost', 'juanmaguerrero', 'dieciseis', 'juanmaguerrero');

// Verificar la conexión
if ($conexion->connect_error) {
    die('Error de conexión: ' . $conexion->connect_error);
}

$sql = "SELECT nombre FROM Subcategorias WHERE categoria_id = (SELECT categoria_id FROM CategoriasEn WHERE nombre = '$categoria')";
$resultado = $conexion->query($sql);
$data = array();
while ($fila = $resultado->fetch_assoc()) {
    $data[] = array(
        "subcategoria" => $fila["nombre"],
    );
}

$conexion->close();

echo json_encode($data);
