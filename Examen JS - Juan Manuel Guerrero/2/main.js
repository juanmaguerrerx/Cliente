var palabras = document.getElementsByTagName("p")[0];
var texto = palabras.innerHTML;
// console.log(texto);
var arrayPal = texto.split(" ");
// console.log(arrayPal);
var select = document.getElementById("palabras");
var numPal = document.getElementById("numPal");
var textoArea = "";
var selecciones = [];

function comenzar() {


    for (var i = 0; i < arrayPal.length; i++) {
        var option = document.createElement("option");
        option.innerText = arrayPal[i];
        select.appendChild(option);
    }
}

function getPalabra() {
    var selPalabra = arrayPal[select.selectedIndex];
    // console.log(selPalabra);

    // console.log(selecciones[selPalabra]);

    
    // console.log(selecciones.includes(selPalabra));
    if(selecciones.includes(selPalabra)){
        selecciones[selPalabra]= selecciones[selPalabra]+1;
    } else{
        selecciones[selPalabra]=1;

        textoArea += selPalabra+": "+selecciones[selPalabra]+"  \n\n";
    }
    numPal.innerText = textoArea;

    // console.log(selecciones);
}

function pasarDiv(){
    var div = document.getElementById("desPalabras");
    div.innerHTML=texto;
}

