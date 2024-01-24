<?php
$username = "root";
$password = "";
$database = "provincias";
$mysqli = new mysqli("localhost", $username, $password, $database);
mysqli_set_charset($mysqli,'UTF8');
$query = "SELECT * FROM provincias";

echo "<select id='provincias'>";
//echo "<th>ID</th><th>Provincia</th>";
if ($result = $mysqli->query($query)) {

    while ($row = $result->fetch_assoc()) {
        echo "<option value=".$row['id'].">".$row['provincia']."</option>";
    }

/*freeresultset*/
echo "</select>";
$result->free();
}