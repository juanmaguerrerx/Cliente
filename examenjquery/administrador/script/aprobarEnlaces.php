<?php
// Obtener el ID del enlace a aprobar
$enlaceID = $_POST['enlaceID'];

// Ejemplo básico de conexión a la base de datos
$servername = "localhost";
$username = "juanmaguerrero";
$password = "dieciseis";
$dbname = "juanmaguerrero";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener los datos del enlace sugerido
$sql = "SELECT * FROM EnlacesSugeridos WHERE enlace_id = $enlaceID";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $enlaceSugerido = $result->fetch_assoc();

    // Insertar el enlace sugerido en la tabla Enlaces
    $tituloEnlace = $enlaceSugerido['titulo'];
    $url = $enlaceSugerido['URL'];
    $subcategoriaID = $enlaceSugerido['sub_id'];
    $palabrasClave = $enlaceSugerido['palabras_clave'];

    $insertSQL = "INSERT INTO Enlaces (titulo, URL, sub_id, palabras_clave) VALUES ('$tituloEnlace', '$url', $subcategoriaID, '$palabrasClave')";

    if ($conn->query($insertSQL) === TRUE) {
        // Eliminar el enlace sugerido después de aprobarlo
        $deleteSQL = "DELETE FROM EnlacesSugeridos WHERE enlace_id = $enlaceID";
        $conn->query($deleteSQL);

        echo "Enlace aprobado y añadido a Enlaces exitosamente";
    } else {
        echo "Error al aprobar el enlace: " . $conn->error;
    }
} else {
    echo "No se encontró el enlace sugerido con ID: $enlaceID";
}

$conn->close();
?>
