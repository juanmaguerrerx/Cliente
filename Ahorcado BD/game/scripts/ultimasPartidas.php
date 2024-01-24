<?php

$id = $_POST['id'];
// Establecer la conexión con la base de datos
$conexion = new mysqli('localhost', 'juanmaguerrero', 'dieciseis', 'juanmaguerrero');

// Verificar la conexión
if ($conexion->connect_error) {
    die('Error de conexión: ' . $conexion->connect_error);
}

$sql = "SELECT partida_id, puntos, fecha FROM Partidas WHERE usuario_id = '$id'";
$resultado = $conexion->query($sql);


if ($resultado) {
    if ($resultado->num_rows > 0) {
        while ($fila = $resultado->fetch_assoc()) {
            $data[] = array(
                "partidaId" => $fila["partida_id"],
                "puntos" => $fila["puntos"],
                "fecha" => $fila["fecha"],
            );
        } 
    }else echo json_encode(["mensaje" => "No se encontraron partidas para $id"]);
}else echo json_encode(["error" => "Error en la consulta ".$conexion->error]);
echo json_encode($data);

$conexion->close();
