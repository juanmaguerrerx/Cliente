//declaramos un array con palabras ordenadas por categorias
const palabras = {
    animales: [
        "perro",
        "gato",
        "elefante",
        "leon",
        "jirafa",
        "cocodrilo",
        "murcielago",
        "delfin",
        "serpiente",
        "oso"
    ],
    frutas: [
        "manzana",
        "platano",
        "naranja",
        "uva",
        "fresa",
        "sandia",
        "kiwi",
        "tomate",
        "melocoton",
        "limon"
    ],
    países: [
        "alemania",
        "francia",
        "china",
        "mexico",
        "australia",
        "india",
        "canada",
        "brasil",
        "italia",
        "hungria"
    ],
    profesiones: [
        "medico",
        "profesor",
        "bombero",
        "abogado",
        "cocinero",
        "electricista",
        "carpintero",
        "ingeniero",
        "enfermero",
        "astronauta"
    ],
    colores: [
        "rojo",
        "azul",
        "amarillo",
        "verde",
        "morado",
        "naranja",
        "rosa",
        "negro",
        "blanco",
        "gris"
    ],
    ciencia: [
        "quimica",
        "biologia",
        "fisica",
        "astronomia",
        "geologia",
        "matematicas",
        "genetica",
        "ecologia",
        "botanica",
        "psicologia"
    ],
    deportes: [
        "futbol",
        "baloncesto",
        "tenis",
        "beisbol",
        "natacion",
        "atletismo",
        "voleibol",
        "golf",
        "ciclismo",
        "esgrima"
    ]
};

//creamos el select de las categorias
var categorias = document.getElementById("categoria");
for (const categoria in palabras) {
    var option = document.createElement("option");
    option.value = categoria;
    option.text = categoria.charAt(0).toUpperCase() + categoria.slice(1);
    categorias.appendChild(option);
}


//declaramos las variables a usar
var mascara = document.getElementById("mascara");
var teclado = document.getElementById("teclado");

var vidas = 6;
var vid = document.getElementById("vid");

var divWin = document.getElementById("win");

var imagen = document.getElementById("imagen");
var image = document.createElement("img");
image.setAttribute("id", "imagen");
imagen.appendChild(image);
image.src = getImage(imagen, vidas);


//funcion que pone en funcionamiento el juego
var palabraAleatoria;
var mask = [];

//creamos el teclado de botones
function hacerTeclado() {
    var letras = [];
    var letra = 'A';
    for (var i = 0; i <= 25; i++) {
        letras[i] = String.fromCharCode(letra.charCodeAt(0) + i);
    }

    for (var i = 0; i < letras.length; i++) {
        var br = document.createElement("br");
        var boton = document.createElement("button");
        boton.setAttribute("onclick", "checkLetra(this)");
        boton.setAttribute("class", "botonLetra");
        boton.innerText = letras[i];
        teclado.appendChild(boton);
    }
}


function jugar() {
    teclado.innerHTML = "";
    var cat = document.getElementById("cat");
    hacerTeclado();
    var categoriaSeleccionada = categorias.value;
    cat.innerText = categoriaSeleccionada.toUpperCase();
    var palabrasCategoria = palabras[categoriaSeleccionada];
    palabraAleatoria = palabrasCategoria[Math.floor(Math.random() * palabrasCategoria.length)];
    mask = getMask(palabraAleatoria);
    mascara.textContent = showMask(mask);
}


//funcion que muestra la mascara como un string
function showMask(m) {
    var st = "";
    for (var i = 0; i < m.length; i++) {
        st += m[i];
    }
    return st.split("_ ");
}


//funcion que me dice si se han averiguado todas las letras
function checkMask(m) {
    var bol = true;
    for (var i = 0; i < m.length; i++) {
        if (m[i] == "_") {
            bol = false;
        }
    }
    return bol;
}


//funcion que devuelve la ruta de la foto segun las vidas que nos queden.
function getImage(i, n) {
    var img;
    var ruta;
    if (n > 6) {
        i.innerText = "Error";
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


//funcion que comprueba si el boton que pulsamos está en la palabra
function checkLetra(boton) {
    var letraSeleccionada = boton.innerText;
    // Realiza aquí tu lógica para comprobar la letra en el juego de ahorcado
    boton.setAttribute("disabled", "true");
    if (isIn(letraSeleccionada, palabraAleatoria)) {
        checkVidas(vidas);
        if (checkMask(mask)) {
            win();
        }
    } else {
        vidas--;
        checkVidas(vidas);
    }
}


//funcion si gana
function win() {
    mascara.innerText = palabraAleatoria.toUpperCase();
    divWin.style.visibility = "visible";
    divWin.innerHTML = "HAS GANADO!<br>";
    var boton = document.createElement("button");
    boton.setAttribute("onclick", "reiniciar()");
    boton.innerHTML = "Reiniciar";
    divWin.appendChild(boton);
}

//funcion si pierde
function lose() {
    var mensaje = "HAS PERDIDO!<br><p id='palabraRes'>La palabra era: " + palabraAleatoria + "</p>";
    divWin.style.visibility = "visible";
    divWin.innerHTML = mensaje;
    var boton = document.createElement("button");
    boton.setAttribute("onclick", "reiniciar()");
    boton.innerHTML = "Reiniciar";
    divWin.appendChild(boton);
}


//funcion que comprueba si la letra está en la palabra
function isIn(letra, palabra) {
    var is = false;
    for (var i = 0; i < palabra.length; i++) {
        if (letra.toUpperCase() == palabra[i].toUpperCase()) {
            is = true;
            mask[i] = letra;
            actMask(showMask(mask));
        }
    }
    return is;
}


//funcion que comprueba y dice al jugador las vidas que tiene, mostrando la imagen correspondiente
function checkVidas(v) {
    if (vidas > 0) {
        image.src = getImage(imagen, vidas);
        vid.innerText = "Te quedan " + vidas + " vidas";
    } else {
        vid.innerText = "Te quedan " + vidas + " vidas";
        image.src = getImage(imagen, vidas);
        lose();
    }
}


//funcion que devuelve la mascara de la palabra 
function getMask(p) {
    for (var i = 0; i < p.length; i++) {
        mask[i] = "_";
    }
    return mask;
}

//funcion para actualizar la mascara
function actMask(t) {
    mascara.textContent = t;
}


//funcion para comprobar la palabra completa
function comprobarPalabra() {
    var palabraCheck = document.getElementById("comprobar");

    if (palabraCheck.value.toUpperCase() == palabraAleatoria.toUpperCase()) {
        palabraCheck.value = "";
        palabraCheck.setAttribute("placeholder", "Correcto");
        win()
    } else {
        palabraCheck.value = "";
        vidas--;
        checkVidas(vidas);
        palabraCheck.setAttribute("placeholder", "Incorrecto");
    }
}


//funcion para reiniciar juego
function reiniciar() {
    window.location.reload()
}