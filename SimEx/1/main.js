checkVal();

var valoracion;

function valorar(b){
    valoracion = b.innerText;
}

function evaluar(n){
    n.innerHTML = valoracion;
    checkVal();
}



function checkVal(){
    var val = document.getElementsByClassName("val");
    for (var i = 0; i < val.length; i++) {
        var valor = val[i].innerText;
        if (valor == null || valor == "") {
            // gris
            val[i].style.backgroundColor = "grey";
        } else if (valor < 5) {
            // rojo
            val[i].style.backgroundColor = "red";
        } else if (valor >= 5 && valor <= 10) {
            // normal
            val[i].style.backgroundColor = "white";
        }
    }
}

function cambiarImagen(b){
    var ruta = b.innerText;
    console.log(ruta);
    console.log('url("'+ruta+'")');
    b.style.backgroundImage = 'url("'+ruta+'")'; 
}

function resetImage(b){
    b.style.backgroundImage = ''; 
}

function colorFila(f){
    f.style.backgroundColor = "aquamarine";
}
function resetFila(f){
    f.style.backgroundColor = "white";
}

// var imagenes = document.getElementsByClassName("imagen");
// var rutas = [];

// for (var i = 0; i < imagenes.length; i++) {
//     rutas[i] = imagenes[i].innerText;

//     imagenes[i].addEventListener("mouseover", function (e) {
//         imagenes[i].style.backgroundImage = "url('" + rutas[i] + "')";

//         imagenes[i].addEventListener("mouseout", function (e) {
//             imagenes[i].style.backgroundImage = "";
//         });
//     });
// }