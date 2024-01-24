<?php
// Recibir los datos del formulario
$categoria = $_POST['categoria'];

// Aquí deberías realizar la verificación de inicio de sesión con la base de datos.
// Este es solo un ejemplo, y es recomendable usar consultas preparadas para mayor seguridad.

// Establecer la conexión con la base de datos
$conexion = new mysqli('localhost', 'juanmaguerrero', 'dieciseis', 'juanmaguerrero');

// Verificar la conexión
if ($conexion->connect_error) {
    die('Error de conexión: ' . $conexion->connect_error);
}

// Consulta para verificar el inicio de sesión
$sql = "SELECT nombre_categoria FROM Categorias WHERE nombre_categoria='$categoria'";
$resultado = $conexion->query($sql);

// Comprobar si hay coincidencias
if ($resultado->num_rows > 0) {
    echo "exist";
}else{
    $sql= "INSERT INTO Categorias (nombre_categoria) VALUES ('$categoria')";
    $resultado = $conexion->query($sql);
    if($resultado->num_rows > 0){
        echo "ERROR";   
    }else{
        echo "OK";
    }
}

// Cerrar la conexión
$conexion->close();
