<?php

$categoria = $_POST["categoria"];

// Establecer la conexión con la base de datos
$conexion = new mysqli('localhost', 'juanmaguerrero', 'dieciseis', 'juanmaguerrero');

// Verificar la conexión
if ($conexion->connect_error) {
    die('Error de conexión: ' . $conexion->connect_error);
}

// Consulta para verificar el inicio de sesión
$sql = "DELETE FROM Categorias WHERE nombre_categoria = '$categoria'";
$resultado = $conexion->query($sql);

// Comprobar si hay coincidencias
if ($resultado){
    echo "OK";
}else echo "ERROR";

// Cerrar la conexión
$conexion->close();
