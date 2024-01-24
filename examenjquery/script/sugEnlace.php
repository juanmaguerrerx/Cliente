<?php

$titulo = $_POST["titulo"];
$url = $_POST["url"];
$palabrasClave = $_POST["palabrasClave"];
$subcategoria = $_POST["subcategoria"];

// Establecer la conexión con la base de datos
$conexion = new mysqli('localhost', 'juanmaguerrero', 'dieciseis', 'juanmaguerrero');

// Verificar la conexión
if ($conexion->connect_error) {
    die('Error de conexión: ' . $conexion->connect_error);
}

$sql = "SELECT sub_id FROM Subcategorias WHERE nombre = '$subcategoria'";
$resultado = $conexion->query($sql);
while ($fila = $resultado->fetch_assoc()) {
    $id = $fila["sub_id"];
}
$sql = "INSERT INTO EnlacesSugeridos (`titulo`, `URL`, `sub_id`, `palabras_clave`) VALUES ('$titulo','$url','$id','$palabrasClave')";
$resultado = $conexion->query($sql);
if ($resultado){
    echo "OK";
}else echo "ERROR";

$conexion->close();

