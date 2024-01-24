<?php
$username = "root";
$password = "";
$database = "provincias";
$mysqli = new mysqli("localhost", $username, $password, $database);
$id = $_GET['id'];
$query = "SELECT * FROM municipios where provincia=".$id;

echo "<select id='municipios'>";
//echo "<th>ID</th><th>Provincia</th>";
if ($result = $mysqli->query($query)) {

    while ($row = $result->fetch_assoc()) {
        echo "<option value=".$row['id'].">".$row['municipio']."</option>";
    }

/*freeresultset*/
echo "</select>";
$result->free();
}