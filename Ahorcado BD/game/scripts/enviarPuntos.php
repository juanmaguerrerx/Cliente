<?php
// Recibir los datos del formulario
$puntos = $_POST["puntos"];
$id = $_POST["id"];
// Aquí deberías realizar la verificación de inicio de sesión con la base de datos.
// Este es solo un ejemplo, y es recomendable usar consultas preparadas para mayor seguridad.

// Establecer la conexión con la base de datos
$conexion = new mysqli('localhost', 'juanmaguerrero', 'dieciseis', 'juanmaguerrero');

// Verificar la conexión
if ($conexion->connect_error) {
    die('Error de conexión: ' . $conexion->connect_error);
}
$sql = "UPDATE Usuarios SET puntos = $puntos WHERE id = $id";
$resultado = $conexion->query($sql);
if ($resultado->num_rows > 0) {
    echo "ERROR";
} else {
    echo "OK";
}

// Cerrar la conexión
$conexion->close();
