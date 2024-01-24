<?php
// Establecer la conexión con la base de datos
$conexion = new mysqli('localhost', 'juanmaguerrero', 'dieciseis', 'juanmaguerrero');

// Verificar la conexión
if ($conexion->connect_error) {
    die('Error de conexión: ' . $conexion->connect_error);
}

$sql = "SELECT p.palabra as palabra, c.nombre_categoria as categoria FROM Palabras p INNER JOIN Categorias c ON c.categoria_id=p.categoria_id";
$resultado = $conexion->query($sql);
$data = array();
while ($fila = $resultado->fetch_assoc()) {
    $data[] = array(
        "palabra" => $fila["palabra"],
        "categoria" => $fila["categoria"],
    );
}

$conexion->close();

echo json_encode($data);
