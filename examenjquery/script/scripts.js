var divContEn = document.getElementById("contEn");
var categorias;
var enlaces;

$(document).ready(function () {
    // Realizar la solicitud AJAX al archivo PHP
    $.ajax({
        url: './script/getCat.php',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // Manipular los datos recibidos y actualizar la tabla
            console.log(data);
            categorias = data;
            llenarSelect(categorias);
            getSubCat(categorias).then(() => {
                console.log("Todas las subcategorías obtenidas.");
            });
        },
        error: function (error) {
            console.log('Error en la solicitud AJAX:', error);
        }
    });
});

function getSubCat(categorias) {
    console.log("getSubCat");
    console.log(categorias.length);

    // Utilizar Promise para manejar las solicitudes síncronamente
    return new Promise((resolve) => {
        // Función recursiva para obtener subcategorías
        function obtenerSubcategorias(indice) {
            if (indice < categorias.length) {
                var divContCat = document.createElement("div");
                var stCat = document.createElement("a");
                stCat.setAttribute("onclick", "mostrar(this)");
                stCat.innerHTML = categorias[indice].categoria;
                divContCat.setAttribute("class", "cat");
                divContCat.appendChild(stCat);
                divContEn.appendChild(divContCat);

                var datos = {
                    categoria: categorias[indice].categoria,
                };

                console.log(datos);

                $.ajax({
                    url: './script/getSubCat.php',
                    type: 'POST',
                    dataType: 'json',
                    data: datos,
                    success: function (data) {
                        console.log(data);
                        var subcategorias = data;
                        putSubCat(divContCat, subcategorias);

                        // Llamar recursivamente para la siguiente categoría
                        obtenerSubcategorias(indice + 1);
                    },
                    error: function (error) {
                        console.log('Error en la solicitud AJAX:', error);
                        resolve(); // Resolver la Promise en caso de error
                    }
                });
            } else {
                resolve(); // Resolver la Promise al finalizar todas las categorías
            }
        }

        // Iniciar el proceso llamando a la función recursiva
        obtenerSubcategorias(0);
    });
}

function putSubCat(divContCat, subcategorias) {
    for (var i = 0; i < subcategorias.length; i++) {
        var divContSub = document.createElement("div");
        var stSub = document.createElement("a");
        stSub.setAttribute("onclick", "mostrarSub(this)")
        stSub.innerHTML = subcategorias[i].subcategoria;
        divContSub.appendChild(stSub);
        divContCat.appendChild(divContSub);
    }
}


var selectCat = document.getElementById("selCategoria");
function llenarSelect(data) {
    console.log(data);
    var select = $('#selCategoria');

    // Limpiar opciones existentes
    select.empty();

    // Iterar sobre los datos y agregar opciones al select
    $.each(data, function (element) {
        select.append('<option value="' + element.id + '">' + element.categoria + '</option>');
    });
}

function obtenerSubCat(sel) {
    var cat = sel[sel.selectedIndex].value;
    cat = subCategoria[cat].subcategoria;

    var select = $('#selSubCategoria');

    // Limpiar opciones existentes
    select.empty();

    // Iterar sobre los datos y agregar opciones al select
    $.each(data, function (element) {
        select.append('<option value="' + element.subCategoria.subCategoria + '">' + element.subCategoria + '</option>');
    });
}


function buscar() {
    var palabra = document.getElementById("busca").value;
    var datos = {
        palabra: palabra,
    }
    console.log(datos);
    $.ajax({
        type: "POST",
        url: "./script/buscar.php",
        data: datos,
        dataType: "json",
        success: function (data) {
            console.log(data);
            enlaces = data;

            ponerEnlaces(enlaces);
        }
    });
}

function ponerEnlaces(e) {
    var enlacesEncontrados = document.getElementById("enlaces");
    enlacesEncontrados.innerHTML = "";
    for (var i = 0; i < e.length; i++) {
        var p = document.createElement("p");
        var a = document.createElement("a");
        a.setAttribute("href", e[i].url);
        a.setAttribute("class", "cat");
        a.innerHTML = e[i].titulo;
        p.appendChild(a);
        enlacesEncontrados.appendChild(p);
    }
}

function sugEnlace() {
    var titulo = document.getElementById("titulo").value;
    var url = document.getElementById("url").value;
    var palabrasClave = document.getElementById("palabrasClave").value;
    var categoria = document.getElementById("inCat").value;
    var subcategoria = document.getElementById("inSubCat").value;

    var datos = {
        titulo: titulo,
        url: url,
        palabrasClave: palabrasClave,
        categoria: categoria,
        subcategoria: subcategoria,
    }

    console.log(datos);

    $.ajax({
        type: "POST",
        url: "./script/sugEnlace.php",
        data: datos,
        dataType: "json",
        success: function (respuesta) {
            console.log(respuesta);
        },
        error: console.log("error")
    });
}
