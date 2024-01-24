$(document).ready(function(){

    $('#cargartabla').click(function(){
        $('#zonaprovincias').load('dameprovincias.php');
    });

    $('#zonaprovincias').on('change','#provincias',function(){
        console.log($('#provincias').val());
        $('#zonamunicipios').load('damemunicipios.php?id='+$('#provincias').val());
    });
    
});