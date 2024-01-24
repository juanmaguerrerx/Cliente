$(document).ready(function () {
    // Cargar enlaces sugeridos al cargar la página
    cargarEnlacesSugeridos();

    // Función para cargar enlaces sugeridos
    function cargarEnlacesSugeridos() {
        $.ajax({
            url: './script/getEnlaces.php', // Ajusta esto con la ruta correcta a tu archivo PHP
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                mostrarEnlacesSugeridos(data);
            },
            error: function (error) {
                console.log('Error en la solicitud AJAX:', error);
            }
        });
    }

    // Función para mostrar enlaces sugeridos en el div
    function mostrarEnlacesSugeridos(enlaces) {
        var divEnlaces = $('#enlaces');
        divEnlaces.empty();

        for (var i = 0; i < enlaces.length; i++) {
            var enlace = enlaces[i];
            var divEnlace = $('<div class="enlace-sugerido">');
            divEnlace.append('<p><strong>Título:</strong> ' + enlace.TituloEnlace + '</p>');
            divEnlace.append('<p><strong>URL:</strong> ' + enlace.URL + '</p>');
            divEnlace.append('<button class="aprobar" data-enlaceid="' + enlace.EnlaceID + '">Aprobar</button>');
            divEnlaces.append(divEnlace);
        }

        // Agregar evento click al botón de aprobar
        $('.aprobar').on('click', function () {
            var enlaceID = $(this).data('enlaceid');
            aprobarEnlace(enlaceID);
        });
    }

    // Función para aprobar un enlace sugerido
    function aprobarEnlace(enlaceID) {
        $.ajax({
            url: './script/aprobarEnlaces.php', // Ajusta esto con la ruta correcta a tu archivo PHP
            type: 'POST',
            data: { enlaceID: enlaceID },
            success: function () {
                // Recargar enlaces sugeridos después de aprobar uno
                cargarEnlacesSugeridos();
            },
            error: function (error) {
                console.log('Error en la solicitud AJAX:', error);
            }
        });
    }
});
