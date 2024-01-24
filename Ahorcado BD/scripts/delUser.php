<?php

$usuario = $_POST["usuario"];

// Establecer la conexión con la base de datos
$conexion = new mysqli('localhost', 'juanmaguerrero', 'dieciseis', 'juanmaguerrero');

// Verificar la conexión
if ($conexion->connect_error) {
    die('Error de conexión: ' . $conexion->connect_error);
}
$sql = "DELETE FROM Partidas WHERE usuario_id = (SELECT id FROM Usuarios WHERE usuario = '$usuario')";
$resultado = $conexion->query($sql);
// Consulta para verificar el inicio de sesión
$sql = "DELETE FROM Usuarios WHERE usuario = '$usuario'";
$resultado = $conexion->query($sql);

// Comprobar si hay coincidencias
if ($resultado){
    echo "OK";
}else echo "ERROR";

// Cerrar la conexión
$conexion->close();
