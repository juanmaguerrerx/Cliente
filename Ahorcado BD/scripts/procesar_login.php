<?php
// Recibir los datos del formulario
$usuario = $_POST['usuario'];
$contrasena = $_POST['contrasena'];

// Aquí deberías realizar la verificación de inicio de sesión con la base de datos.
// Este es solo un ejemplo, y es recomendable usar consultas preparadas para mayor seguridad.

// Establecer la conexión con la base de datos
$conexion = new mysqli('localhost', 'juanmaguerrero', 'dieciseis', 'juanmaguerrero');

// Verificar la conexión
if ($conexion->connect_error) {
    die('Error de conexión: ' . $conexion->connect_error);
}

// Consulta para verificar el inicio de sesión
$sql = "SELECT * FROM Usuarios WHERE usuario='$usuario' AND contrasena='$contrasena'";
$resultado = $conexion->query($sql);

// Comprobar si hay coincidencias
if ($resultado->num_rows > 0) {
    $sql = "SELECT es_administrador FROM Usuarios WHERE usuario='$usuario'";
    $resultado = $conexion->query($sql);

    // Comprobar si hay coincidencias
    if ($resultado->num_rows > 0) {
        // Obtener el valor de es_administrador
        $fila = $resultado->fetch_assoc();
        $es_administrador = $fila['es_administrador'];

        // Verificar si es administrador
        if ($es_administrador == 1) {
            echo 'OKa';
        } else if ($es_administrador != 1) {
            echo 'OKu';
        }
    }
} else { //Hacemos otra consulta
    $sql = "SELECT * FROM Usuarios WHERE usuario='$usuario'";
    $resultado = $conexion->query($sql);
    if ($resultado->num_rows > 0) { //Si nos devuelve una columna, el usuario existe, por lo que el error estará en la contraseña
        echo "Contraseña";
    } else echo "Usuario"; //Si no, es el usuario el que no existe
}

// Cerrar la conexión
$conexion->close();
