    <?php
// Recibir los datos del formulario
$usuario = $_POST['usuario'];
$email = $_POST['email'];
$contrasena = $_POST['contrasena'];

// Aquí deberías realizar la verificación de inicio de sesión con la base de datos.
// Este es solo un ejemplo, y es recomendable usar consultas preparadas para mayor seguridad.

// Establecer la conexión con la base de datos
$conexion = new mysqli('localhost', 'juanmaguerrero', 'dieciseis', 'juanmaguerrero');

// Verificar la conexión
if ($conexion->connect_error) {
    die('Error de conexión: ' . $conexion->connect_error);
}

// Consulta para verificar los datos
$sql = "SELECT * FROM Usuarios WHERE usuario='$usuario'";
$resultado = $conexion->query($sql);

// Comprobar si hay coincidencias
if ($resultado->num_rows > 0) {
    echo 'Usuario'; // Usuario ya existe

} else { //Hacemos otra consulta
    $sql = "SELECT * FROM Usuarios WHERE email='$email'"; 
    $resultado = $conexion->query($sql);
    if($resultado->num_rows>0){ //Si nos devuelve una columna, el mail ya esta registrado
        echo "Email";
    }else { //Si no, podemos registrar al usuario
        $sql = "INSERT INTO Usuarios (email, usuario, contrasena, es_administrador) VALUES
        ('$email','$usuario','$contrasena',FALSE)";
        $resultado = $conexion->query($sql);
        if($resultado->num_rows > 0){
            echo "ERROR";
        }else {
        echo "OK";
        }
    }
}

// Cerrar la conexión
$conexion->close();
?>
