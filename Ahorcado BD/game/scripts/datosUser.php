<?php

$usuario = $_POST['usuario'];
// Establecer la conexión con la base de datos
$conexion = new mysqli('localhost', 'juanmaguerrero', 'dieciseis', 'juanmaguerrero');

// Verificar la conexión
if ($conexion->connect_error) {
    die('Error de conexión: ' . $conexion->connect_error);
}

$sql = "SELECT id, contrasena FROM Usuarios WHERE usuario = '$usuario'";
$resultado = $conexion->query($sql);

while ($fila = $resultado->fetch_assoc()) {
    $data[] = array(
        "id" => $fila["id"],
        "contrasena" => $fila["contrasena"],
    );
}
echo json_encode($data);

$conexion->close();

