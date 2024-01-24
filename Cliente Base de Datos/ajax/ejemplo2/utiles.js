$(document).ready(function(){
    $('#botoncargar').click(function(){
        $.ajax({
            url : 'https://jsonplaceholder.typicode.com/posts/',
            //data : { id : 123 },
            type : 'GET',
            dataType : 'json',
            success : function(datos) {
                console.log(datos);
                //alert(datos.title);
                $('#contenido').append('<h1>'+datos.title+'</h1>');
                $('#contenido').append(datos.body);
            },
            error : function(xhr, status) {
                alert('Disculpe, existió un problema');
            },
            complete : function(xhr, status) {
                alert('Petición realizada');
            }
        });
    })
});