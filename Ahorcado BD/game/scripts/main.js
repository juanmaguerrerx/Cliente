var usuario = localStorage.getItem("userName");
var id;

var contrasena;
var puntosTotales;

var vid = document.getElementById("vid");

var categoria;
var palabras;
var palabra;
var categoriaSeleccionada;
var mask = [];
var vidas;
var puntos;

var spanUs = document.getElementById("usuario");
var spanPun = document.getElementById("puntos");
var puntosActuales = document.getElementById("pointsAct");
var imagen = document.getElementById("ahorcado-img");

spanUs.innerHTML = usuario;


var guardarDatosUs = {
    usuario: usuario,
}
$(document).ready(function () {
    // Realizar la solicitud AJAX al archivo PHP
    $.ajax({
        url: './scripts/datosUser.php', // Ajusta esto con la ruta correcta a tu archivo PHP
        type: 'POST',
        data: guardarDatosUs,
        dataType: 'json',
        success: function (data) {
            // Manipular los datos recibidos y actualizar la tabla
            if (data.length > 0) {
                // Acceder a los datos
                contrasena = data[0].contrasena;
                id = data[0].id;
                getPartidas(id);
                getPuntos(id);
                // Hacer algo con la contraseña y los puntos
            } else {
                console.log("No se encontraron datos para el usuario.");
            }
        },
        error: function (error) {
            console.log('Error en la solicitud AJAX:', error);
        }
    });
});


function getPuntos(id) {
    var datosPuntos = {
        id: id,
    }
    // Realizar la solicitud AJAX al archivo PHP
    $.ajax({
        url: './scripts/getPuntos.php', // Ajusta esto con la ruta correcta a tu archivo PHP
        type: 'POST',
        data: datosPuntos,
        dataType: 'json',
        success: function (data) {
            // Manipular los datos recibidos y actualizar la tabla
            if (data.length > 0) {
                // Acceder a los datos
                puntosTotales = data[0].puntos;
                spanPun.innerHTML = puntosTotales;
            } else {
                console.log("No se encontraron datos para el usuario.");
            }
        },
        error: function (error) {
            console.log('Error en la solicitud AJAX:', error);
        }
    });
}



var selectCat = document.getElementById("selectCat");
$(document).ready(function () {
    // Realizar la solicitud AJAX al archivo PHP
    $.ajax({
        url: './scripts/selectCategoria.php', // Ajusta esto con la ruta correcta a tu archivo PHP
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // Manipular los datos recibidos y actualizar la tabla
            for (var i = 0; i < data.length; i++) {
                llenarSelect(data);
            }
        },
        error: function (error) {
            console.log('Error en la solicitud AJAX:', error);
        }
    });
});

function llenarSelect(data) {
    var select = $('#selectCat');

    // Limpiar opciones existentes
    select.empty();

    select.append('<option value="" disabled selected>-Elija una categoría-</option>');
    // Iterar sobre los datos y agregar opciones al select
    $.each(data, function (index, element) {
        select.append('<option value="' + element.id + '">' + element.nombre + '</option>');
    });
}

$("#ultimasPartidas").DataTable({
    columns: [
        { data: "partidaId" },
        { data: "puntos" },
        { data: "fecha" },
    ],
});

function getPartidas(id) {
    var datosID = {
        id: id,
    }
    // Realizar la solicitud AJAX al archivo PHP
    $.ajax({
        url: './scripts/ultimasPartidas.php', // Ajusta esto con la ruta correcta a tu archivo PHP
        type: 'POST',
        data: datosID,
        dataType: 'json',
        success: function (data) {
            // Manipular los datos recibidos y actualizar la tabla
            if (data.hasOwnProperty('mensaje')) {
            } else {
                // Si no hay mensaje, actualiza la tabla
                var table = $("#ultimasPartidas").DataTable();
                table.rows.add(data).draw();
            }
        },
        error: function (error) {
            console.log('Error en la solicitud AJAX:', error);
        },
    });
}


function escogida(s) {
    categoriaSeleccionada = (s.value);
    categoria = s[categoriaSeleccionada].innerText;
    var datos = {
        categoria: categoriaSeleccionada,
    }
    $.ajax({
        url: './scripts/getPalabras.php', // Ajusta esto con la ruta correcta a tu archivo PHP
        type: 'POST',
        data: datos,
        dataType: 'json',
        success: function (data) {
            // Manipular los datos recibidos y actualizar la tabla
            palabras = data;
            palabra = palabras[Math.floor(Math.random() * palabras.length)].palabra.toUpperCase();
        },
        error: function (error) {
            console.log('Error en la solicitud AJAX:', error);
        }
    });

}

function generarTeclado() {
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const tecladoDiv = document.getElementById("teclado");

    for (let letra of letras) {
        const boton = document.createElement("button");
        boton.classList.add("btn", "btn-secondary");
        boton.textContent = letra;
        boton.setAttribute("onclick", "check(this)");
        boton.setAttribute("id", "tecladoBoton");
        tecladoDiv.appendChild(boton);

    }


}


//funciones antes del juego
function mostrarPassword() {
    var cambio = document.getElementById("txtPassword");
    var cambio2 = document.getElementById("txtPassword2");
    if (cambio.type == "password") {
        cambio.type = "text";
        $('.icon').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
    } else {
        cambio.type = "password";
        $('.icon').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
    }
    if (cambio2.type == "password") {
        cambio2.type = "text";
        $('.icon').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
    } else {
        cambio2.type = "password";
        $('.icon').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
    }
}

$(document).ready(function () {
    //CheckBox mostrar contraseña
    $('#ShowPassword').click(function () {
        $('#Password').attr('type', $(this).is(':checked') ? 'text' : 'password');
    });
});

function cerrarAlert() {
    document.getElementById("miAlerta").style.display = "none";
}
function cerrarAlertWin() {
    document.getElementById("winLose").style.display = "none";
}



function jugar() {
    if (categoriaSeleccionada == null) { //si la categoria no esta seleccionada
        $("#miAlerta").show();
    } else { //si esta continuamos la ejecución
        document.getElementById("botonJuego").setAttribute("disabled", "true");
        document.getElementById("selectCat").setAttribute("disabled", "true");
        generarTeclado();
        vidas = 6;
        puntos = 0;

        //mascara
        var mascara = document.getElementById("mascara");
        mascara.style.visibility = "visible";
        mask = getMask(palabra);
        mascara.textContent = showMask(mask);

        //teclado
        document.getElementById("teclado").style.visibility = "visible";

        //imagen

        imagen.style.visibility = "visible";
        imagen.src = getImage(vidas);

        //comprobar palabra
        document.getElementById("comprobar").style.visibility = "visible";

        //puntos
        document.getElementById("puntosAct").style.visibility = "visible";


    }
}

function check(b) {
    var letra;
    b.setAttribute("disabled", "true");
    letra = b.innerText;
    letra = letra.toUpperCase();
    if (isIn(letra, palabra)) {
        puntos += 2;
        checkVidas(vidas);
        if (checkMask(mask)) {
            //win
            puntos += 10;
            win();
        }
    } else {
        vidas--;
        puntos -= 1;
        checkVidas(vidas);
    }
    puntosActuales.innerHTML = puntos;

}

function checkMask(m) {
    var bol = true;
    for (var i = 0; i < m.length; i++) {
        if (m[i] == "_") {
            bol = false;
        }
    }
    return bol;
}

function isIn(letra, palabra) {
    var is = false;
    for (var i = 0; i < palabra.length; i++) {
        if (letra == palabra[i]) {
            is = true;
            mask[i] = letra;
            actMask(showMask(mask));
        }
    }
    return is;
}
function checkVidas(v) {
    if (vidas > 0) {
        imagen.src = getImage(vidas);
        vid.innerText = "Te quedan " + vidas + " vidas";
    } else {
        vid.innerText = "Te quedan " + vidas + " vidas";
        imagen.src = getImage(vidas);
        console.log("lose");
        puntos -= 5;
        lose();
        puntosActuales.innerHTML = puntos;

    }
}

function getImage(n) {
    var img;
    var ruta = "";
    if (n > 6) {
        vid.innerText = "Error";
    } else {
        switch (n) {
            case 6: img = 0; break;
            case 5: img = 1; break;
            case 4: img = 2; break;
            case 3: img = 3; break;
            case 2: img = 4; break;
            case 1: img = 5; break;
            case 0: img = 6; break;
        }
        ruta = "images/Ahorcado-" + img + ".png";
    }
    return ruta;
}

function getMask(p) {
    var mask = [];
    for (var i = 0; i < p.length; i++) {
        mask[i] = '_';
    }
    return mask;
}

function showMask(m) {
    var st = "";
    for (var i = 0; i < m.length; i++) {
        st += m[i] + " ";
    }
    return st;
}

function actMask() {
    mascara.textContent = showMask(mask);
}

function lose() {
    var winLose = document.getElementById("winlose");
    winLose.innerHTML = "HAS PERDIDO!!";
    winLose.setAttribute("class", "alert alert-danger alert-dismissible fade show");
    $("#winlose").show();
    var mascara = document.getElementById("mascara");
    mascara.style.visibility = "hidden";
    document.getElementById("teclado").style.visibility = "hidden";
    imagen.style.visibility = "hidden";
    document.getElementById("comprobar").style.visibility = "hidden";
    document.getElementById("teclado").style.visibility = "hidden";
    document.getElementById("volverJugar").style.visibility = "visible";
    enviarPartida(id);
    enviarPuntos(id);
}
function win() {
    var winLose = document.getElementById("winlose");
    winLose.innerHTML = "HAS GANADO!!"
    winLose.setAttribute("class", "alert alert-success alert-dismissible fade show");
    $("#winlose").show();
    var mascara = document.getElementById("mascara");
    mascara.style.visibility = "hidden";
    imagen.style.visibility = "hidden";
    document.getElementById("comprobar").style.visibility = "hidden";
    document.getElementById("teclado").style.visibility = "hidden";
    document.getElementById("volverJugar").style.visibility = "visible";
    location.href="#cabeza";
    enviarPartida(id);
    enviarPuntos(id);
}

function recargar() {
    location.reload();
}

function enviarPartida(id) {
    var datos = {
        id: id,
        puntos: puntos,
    }
    $.ajax({
        url: './scripts/enviarPartida.php', // Ajusta esto con la ruta correcta a tu archivo PHP
        type: 'POST',
        data: datos,
        success: function (respuesta) {
            // Manipular los datos recibidos y actualizar la tabla
            if (respuesta = "OK") {
                console.log("Partida enviada");
            } else {
                console.log("error");
            }
        },
        error: function (error) {
            console.log('Error en la solicitud AJAX:', error);
        }
    });
}
function enviarPuntos(id) {
    var puntosenv = parseInt(puntosTotales) + parseInt(puntos);
    var datos = {
        id: id,
        puntos: puntosenv,
    }
    $.ajax({
        url: './scripts/enviarPuntos.php', // Ajusta esto con la ruta correcta a tu archivo PHP
        type: 'POST',
        data: datos,
        success: function (respuesta) {
            // Manipular los datos recibidos y actualizar la tabla
            if (respuesta = "OK") {
                console.log("ok");
            } else {
                console.log("error");
            }
        },
        error: function (error) {
            console.log('Error en la solicitud AJAX:', error);
        }
    });
}

function cerrar(){
    window.location.href = "../index.html";
}

function checkPalabra(){
    var palUs = document.getElementById("adivinanza");
    var menCom = document.getElementById("menCom");
    if (palUs.value.toUpperCase()==palabra.toUpperCase()){
        puntos+=10;
        puntosActuales.innerHTML = puntos;
        win();
    }else{
        puntos-=5;
        palUs.value="";
        palUs.setAttribute("placeholder","Palabra incorrecta");
        menCom.innerHTML = "Palabra incorrecta (-5 puntos)";
        menCom.style.color = "red";
    }
}

function cambiarPass(){
    var con1 = document.getElementById("txtPassword").value;
    var con2 = document.getElementById("txtPassword2").value;
    var menCon = document.getElementById("menCon");

    if (con1==con2){
        var datos = {
            contrasena: con1,
            id: id,
        }
        $.ajax({
            url: './scripts/cambiarPass.php', // Ajusta esto con la ruta correcta a tu archivo PHP
            type: 'POST',
            data: datos,
            success: function (respuesta) {
                // Manipular los datos recibidos y actualizar la tabla
                if (respuesta = "OK") {
                    console.log("Contraseña cambiada");
                    menCon.innerHTML = "Contraseña cambiada";
                } else {
                    console.log("error");
                    menCon.innerHTML = "Ha habido un error";
                }
            },
            error: function (error) {
                console.log('Error en la solicitud AJAX:', error);
            }
        });
    }else {
        menCon.innerHTML = "Las contraseñas deben coincidir";
    }
}

//funcion para poner tiempo de espera
function sleep(ms) {
    var hasta = new Date().getTime() + ms;
    while (new Date().getTime() < hasta) continue;
}