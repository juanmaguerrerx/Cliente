<?php
$lastUser = $_POST["lastUser"];
$usuario = $_POST["usuario"];
$email = $_POST["email"];
$contrasena = $_POST["contrasena"];
$puntos = $_POST["puntos"];

// Establecer la conexión con la base de datos
$conexion = new mysqli('localhost', 'juanmaguerrero', 'dieciseis', 'juanmaguerrero');

// Verificar la conexión
if ($conexion->connect_error) {
    die('Error de conexión: ' . $conexion->connect_error);
}

// Consulta para verificar el inicio de sesión
$sql = "UPDATE Usuarios SET usuario = '$usuario', email = '$email', contrasena = '$contrasena', puntos = '$puntos' WHERE usuario = '$lastUser'";
$resultado = $conexion->query($sql);

// Comprobar si hay coincidencias
if ($conexion->affected_rows != 0){
    echo "OK";
}else echo "ERROR";

// Cerrar la conexión
$conexion->close();
