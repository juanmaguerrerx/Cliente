function validar() {
    var dni = document.getElementById("dni");
    if (dni.value != (/\d{8}[a-z A-Z]/)){
        var span = document.getElementById("incorrecto");
        span.innerHTML = "Formato incorrecto";
        span.style = "color:red;";
    }
}