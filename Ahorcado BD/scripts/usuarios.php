<?php
// Establecer la conexión con la base de datos
$conexion = new mysqli('localhost', 'juanmaguerrero', 'dieciseis', 'juanmaguerrero');

// Verificar la conexión
if ($conexion->connect_error) {
    die('Error de conexión: ' . $conexion->connect_error);
}

$sql = "SELECT u.email, u.usuario, u.contrasena, u.puntos FROM Usuarios u";
$resultado = $conexion->query($sql);
$data = array();
while ($fila = $resultado->fetch_assoc()) {
    $data[] = array(
        "email" => $fila["email"],
        "usuario" => $fila["usuario"],
        "contrasena" => $fila["contrasena"],
        "puntos" => $fila["puntos"]
    );
}

$conexion->close();

echo json_encode($data);
