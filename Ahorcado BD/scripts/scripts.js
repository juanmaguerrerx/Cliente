//Login
function enviarDatos() {
    // Obtener los valores del formulario
    var usuario = document.getElementById('usuario').value;
    var contrasena = document.getElementById('txtPassword').value;

    if (usuario == "" || contrasena == "") {
        document.getElementById('mensaje').innerHTML = 'Debe rellenar los campos';
    }

    // Crear objeto de datos
    var datos = {
        usuario: usuario,
        contrasena: contrasena,
    };
    document.getElementById("mensaje").innerHTML = "Iniciando sesión...";

    // Enviar los datos al servidor usando AJAX
    $.ajax({
        type: 'POST',
        url: 'scripts/procesar_login.php', // Ruta del archivo de procesamiento en el servidor
        data: datos,
        success: function (respuesta) {
            // Manejar la respuesta del servidor
            if (respuesta === 'OKa') {
                // Login exitoso como admin
                document.getElementById('mensaje').innerHTML = 'Login exitoso. Admin';
                sleep(1500);
                localStorage.setItem('userName', datos.usuario);
                window.location.href = './pags/admin.html';
            } else if (respuesta === 'OKu') {
                document.getElementById('mensaje').innerHTML = 'Login exitoso';
                sleep(1500);
                localStorage.setItem('userName', datos.usuario);
                window.location.href = './game/game.html';
            }
            else if (respuesta == 'Usuario') {
                // Login fallido
                document.getElementById('mensaje').innerHTML = 'Login fallido. Usuario no existe.';
            } else if (respuesta == 'Contraseña') {
                document.getElementById('mensaje').innerHTML = 'Login fallido. Contraseña incorrecta.';

            }
        }
    });
}

//Enviar los datos del registro
function enviarDatosReg() {
    // Obtener los valores del formulario
    var usuario = document.getElementById('usuario').value;
    var email = document.getElementById('email').value;
    var contrasena = document.getElementById('txtPassword').value;

    if (email == "" || usuario == "" || contrasena == "") {
        document.getElementById("mensaje").innerHTML = "Error. Los campos no pueden estar vacíos";
    }else{

    // Crear objeto de datos
    var datos = {
        usuario: usuario,
        email: email,
        contrasena: contrasena,
    };

    document.getElementById("mensaje").innerHTML = "Registrando usuario...";
    // Enviar los datos al servidor usando AJAX
    $.ajax({
        type: 'POST',
        url: '../scripts/procesar_registro.php', // Ruta del archivo de procesamiento en el servidor
        data: datos,
        success: function (respuesta) {
            // sleep(1500);
            // Manejar la respuesta del servidor            
            if (respuesta = "OK") {
                // Registro exitoso
                document.getElementById('mensaje').innerHTML = 'Registro exitoso';
                window.location.href = '../index.html';

            } else if (respuesta = "Usuario") {
                // Registro fallido
                document.getElementById('mensaje').innerHTML = 'Registro fallido. Usuario ya existe.';
            } else if (respuesta = "Email") {
                document.getElementById('mensaje').innerHTML = 'Registro fallido. Email ya existe.';

            } else if (respuesta = "ERROR") {
                document.getElementById('mensaje').innerHTML = 'Registro fallido. Vuelva a intentarlo de nuevo';
            }
        }
    });
}
}

//Datatable de categorias
$("#categorias").DataTable({
    columns: [
        { data: "id" },
        { data: "nombre" },
        {
            data: null,
            defaultContent: '<button class="btnEliminarCat" data-bs-toggle="modal" data-bs-target="#confirmarBorrado" onclick="pasarCat(this)">Eliminar</button>'
        },
    ],
});
$(document).ready(function () {
    // Realizar la solicitud AJAX al archivo PHP
    $.ajax({
        url: '../scripts/categorias.php', // Ajusta esto con la ruta correcta a tu archivo PHP
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // Manipular los datos recibidos y actualizar la tabla
            var table = $("#categorias").DataTable();
            table.rows.add(data).draw();
        },
        error: function (error) {
            console.log('Error en la solicitud AJAX:', error);
        }
    });
});

//Datatable de palabras
$("#palabras").DataTable({
    columns: [
        { data: "palabra" },
        { data: "categoria" },
        {
            data: null,
            defaultContent: '<button class="btnEliminarPal" onclick="delPal(this)">Eliminar</button>'
        },
    ],
});
$(document).ready(function () {
    // Realizar la solicitud AJAX al archivo PHP
    $.ajax({
        url: '../scripts/palabras.php', // Ajusta esto con la ruta correcta a tu archivo PHP
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // Manipular los datos recibidos y actualizar la tabla
            var table = $("#palabras").DataTable();
            table.rows.add(data).draw();
        },
        error: function (error) {
            console.log('Error en la solicitud AJAX:', error);
        }
    });
});

//Datatable de usuarios
$("#usuarios").DataTable({
    columns: [
        { data: "email" },
        { data: "usuario" },
        { data: "contrasena" },
        { data: "puntos" },
        {
            data: null,
            defaultContent: '<button class="btnModificarUser" data-bs-toggle="modal" data-bs-target="#modalEditar" onclick="pasarForm(this)">Modificar</button>&nbsp<button class="btnEliminarUser" data-bs-toggle="modal" data-bs-target="#confirmarBorradoUser" onclick="pasarUser(this)">Eliminar</button>'
        },
    ],

});
$(document).ready(function () {
    // Realizar la solicitud AJAX al archivo PHP
    $.ajax({
        url: '../scripts/usuarios.php', // Ajusta esto con la ruta correcta a tu archivo PHP
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // Manipular los datos recibidos y actualizar la tabla
            var table = $("#usuarios").DataTable();
            table.rows.add(data).draw();
        },
        error: function (error) {
            console.log('Error en la solicitud AJAX:', error);
        }
    });
});

//Funcion para mostrar la contraseña 
function mostrarPassword() {
    var cambio = document.getElementById("txtPassword");
    if (cambio.type == "password") {
        cambio.type = "text";
        $('.icon').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
    } else {
        cambio.type = "password";
        $('.icon').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
    }
}

$(document).ready(function () {
    //CheckBox mostrar contraseña
    $('#ShowPassword').click(function () {
        $('#Password').attr('type', $(this).is(':checked') ? 'text' : 'password');
    });
});

//Select para seleccionar la categoria en la pagina de añadir palabra
var selectCat = document.getElementById("anadirPalabra");
$(document).ready(function () {
    // Realizar la solicitud AJAX al archivo PHP
    $.ajax({
        url: '../scripts/selPal.php', // Ajusta esto con la ruta correcta a tu archivo PHP
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
    var select = $('#anadirPalabra');

    // Limpiar opciones existentes
    select.empty();

    // Iterar sobre los datos y agregar opciones al select
    $.each(data, function (index, element) {
        select.append('<option value="' + element.id + '">' + element.nombre + '</option>');
    });
}

//Añadir palabra
async function addWord() {
    var palabra = document.getElementById("palabra").value;
    var categoria = document.getElementById("anadirPalabra").value;
    var label = document.getElementById("wordLabel");

    if (palabra == "") {
        label.innerHTML = "Los campos deben rellenarse";
    }

    var datos = {
        palabra: palabra,
        categoria: categoria,
    };


    label.innerHTML = 'Mandando peticion...';

    $.ajax({
        type: 'POST',
        url: '../scripts/anadirPalabra.php', // Ruta del archivo de procesamiento en el servidor
        data: datos,
        success: function (respuesta) {
            // Manejar la respuesta del servidor
            if (respuesta == 'OK') { // Insertado
                // document.getElementById("mensajePalabra").innerHTML = "Palabra insertada con éxito";
                label.innerHTML = "Palabra insertada con éxito";
                sleep(1500);
                window.location.href = "./admin.html";

            } else if (respuesta === 'exist') { // Ya existe palabra
                sleep(1500);
                label.innerHTML = "Error. Palabra ya existe";
            }
            else if (respuesta == 'ERROR') { // Error
                sleep(1500);
                label.innerHTML = "Error. Vuelva a intentarlo";
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}

var selectCat = document.getElementById("anadirPalabra");
$(document).ready(function () {
    // Realizar la solicitud AJAX al archivo PHP
    $.ajax({
        url: '../scripts/selPal.php', // Ajusta esto con la ruta correcta a tu archivo PHP
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
    var select = $('#anadirPalabra');

    // Limpiar opciones existentes
    select.empty();

    // Iterar sobre los datos y agregar opciones al select
    $.each(data, function (index, element) {
        select.append('<option value="' + element.id + '">' + element.nombre + '</option>');
    });
}

//Añadir categoria
function enviarCategoria() {
    var categoria = document.getElementById("categoria").value;
    var status = document.getElementById("catStatus");
    status.innerHTML = "Mandando peticion...";
    document.getElementsByClassName("btn btn-primary")[0].setAttribute("disabled", "true");

    if (categoria == "") {
        status.innerHTML = "Debe rellenar el campo";
    }
    var datos = {
        categoria: categoria,
    };

    $.ajax({
        type: 'POST',
        url: '../scripts/anadirCategoria.php', // Ruta del archivo de procesamiento en el servidor
        data: datos,
        success: function (respuesta) {
            // Manejar la respuesta del servidor
            if (respuesta == 'OK') { //Insertado
                status.innerHTML = "Categoria añadida con éxito";
                sleep(1500);
                location.href = "./admin.html";
            } else if (respuesta == 'exist') { //Ya existe palabra
                status.innerHTML = "Error. Categoria ya existe";
            }
            else if (respuesta == 'ERROR') { //Error
                status.innerHTML = "Error. Vuelva a intentarlo";
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}

//funcion para poner tiempo de espera
function sleep(ms) {
    var hasta = new Date().getTime() + ms;
    while (new Date().getTime() < hasta) continue;
}




function delPal(r) {
    var rowData = $('#palabras').DataTable().row($(r).parents('tr')).data();
    var palabra = rowData.palabra;
    var datos = {
        palabra: palabra,
    }
    $.ajax({
        type: 'POST',
        url: '../scripts/delPal.php', // Ruta del archivo de procesamiento en el servidor
        data: datos,
        success: function (respuesta) {
            // Manejar la respuesta del servidor
            if (respuesta == "OK") {
                console.log("done");
                location.reload();
            }
            else {
                console.log("error");
            }
        },
        error: function (error) {
            console.log(error);
        }
    });

}
var rowData;
var categoria;
var id;
function pasarCat(r) {
    rowData = $('#categorias').DataTable().row($(r).parents('tr')).data();
    categoria = rowData.nombre;
    id = rowData.id;
}

function delCat() {

    var datos = {
        id: id,
    }
    $.ajax({
        type: 'POST',
        url: '../scripts/delPalFromCat.php', // Ruta del archivo de procesamiento en el servidor
        data: datos,
        success: function (respuesta) {
            // Manejar la respuesta del servidor
            if (respuesta == "OK") {
                console.log("done");
                var datos = {
                    categoria: categoria,
                }
                $.ajax({
                    type: 'POST',
                    url: '../scripts/delCat.php', // Ruta del archivo de procesamiento en el servidor
                    data: datos,
                    success: function (respuesta) {
                        // Manejar la respuesta del servidor
                        if (respuesta == "OK") {
                            console.log("done");
                            $("#confirmarBorrado").modal('hide');
                            location.reload();
                        }
                        else {
                            console.log("error");
                        }
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            }
            else {
                console.log("error");
            }
        },
        error: function (error) {
            console.log(error);
        }
    });



}

var rowData;
var usuario;
function pasarUser(r) {
    rowData = $('#usuarios').DataTable().row($(r).parents('tr')).data();
    usuario = rowData.usuario;

}
function delUser(r) {
    var datos = {
        usuario: usuario,
    }

    $.ajax({
        type: 'POST',
        url: '../scripts/delUser.php', // Ruta del archivo de procesamiento en el servidor
        data: datos,
        success: function (respuesta) {
            // Manejar la respuesta del servidor
            if (respuesta == "OK") {
                console.log("done");
                $("#confirmarBorradoUser").modal('hide');
                location.reload();

            }
            else {
                console.log("error");
            }
        },
        error: function (error) {
            console.log(error);
        }
    });

}

var email, usuario, contrasena, puntos;
var form = document.getElementById("modiUser");
var inputs = form.getElementsByTagName("input");
var menCampos = document.getElementById("campos");
var lastUser;

function pasarForm(r) {
    rowData = $('#usuarios').DataTable().row($(r).parents('tr')).data();
    inputs[0].value = rowData.email;
    inputs[1].value = rowData.usuario;
    inputs[2].value = rowData.contrasena;
    inputs[3].value = rowData.puntos;
    email = rowData.email;
    usuario = rowData.usuario;
    contrasena = rowData.contrasena;
    puntos = rowData.puntos;
    lastUser = rowData.usuario;
}
function modUser() {
    if (email == "" || usuario == "" || contrasena == "" || puntos == "") {
        menCampos.innerHTML = "Error. Los campos no pueden estar vacíos";
    } else {
        email = inputs[0].value;
        usuario = inputs[1].value;
        contrasena = inputs[2].value;
        puntos = inputs[3].value;
        var datos = {
            usuario: usuario,
            contrasena: contrasena,
            email: email,
            puntos: puntos,
            lastUser: lastUser,
        }
        sleep(1000);
        $.ajax({
            type: 'POST',
            url: '../scripts/modUser.php', // Ruta del archivo de procesamiento en el servidor
            data: datos,
            success: function (respuesta) {
                // Manejar la respuesta del servidor
                if (respuesta == "OK") {
                    console.log("done");
                    $("#modalEditar").modal('hide');
                    location.reload();
                }
                else {
                    console.log("error");
                    menCampos.innerHTML = "Error";
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    }
}