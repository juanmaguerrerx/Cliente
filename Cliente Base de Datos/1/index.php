<?php

try {

    $host = "localhost"; // Cambia esto a la dirección de tu servidor de base de datos
    $usuario = "root"; // Cambia esto al usuario de la base de datos
    $contrasena = ""; // Cambia esto a la contraseña de la base de datos
    $base_de_datos = "provincias"; // Cambia esto al nombre de tu base de datos

    $conn = new mysqli($host, $usuario, $contrasena, $base_de_datos);

    
    

    $sql = "SELECT * FROM tbl_provincias";
    $rs = mysqli_query($conn, $sql);
    // print_r($rs);

    $registro = mysqli_fetch_all($rs);

    // echo "<pre>";
    // print_r($registro);
    // echo "</pre>";

    for ($i = 0; $i < count($registro); $i++) {
        echo "<p>Provincia: " . $registro[$i][1] . "</p>";
    }
} catch (Exception $e) {
    echo "<h1>Error</h1>";
    echo $e->getTraceAsString();
}
?>