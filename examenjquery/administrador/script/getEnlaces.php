<?php
// Ejemplo básico de conexión a la base de datos
$servername = "localhost";
$username = "juanmaguerrero";
$password = "dieciseis";
$dbname = "juanmaguerrero";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener enlaces sugeridos de la base de datos
$sql = "SELECT * FROM EnlacesSugeridos";
$result = $conn->query($sql);

$enlaces = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $enlaces[] = $row;
    }
}

// Devolver enlaces como JSON
header('Content-Type: application/json');
echo json_encode($enlaces);

$conn->close();
?>
