//Creamos funcion para numeros random del 0 al 10
function randomNumber() {
    var numero = Math.floor(Math.random() * 10);
    // console.log(numero);
    return numero;
}

//Creamos funcion para hacer un array de numeros random sin repetir
function numberRandomArray(n) {
    var numeros = [];
    for (var i = 0; i < n; i++) {
        var numero = randomNumber();
        while (isRepeat(numeros, numero)) {
            var numero = randomNumber();
        }
        numeros.push(numero);
    }
    return numeros;
}

//Funcion para ver si se repite el numero a introducit en el array
function isRepeat(array, number) {
    var repeat = false;
    for (var i = 0; i < array.length; i++) {
        if (array[i] == number) {
            repeat = true;
        }
    }
    return repeat;
}

var numeros = numberRandomArray(5);
// console.log(numeros);

var cont = document.getElementsByClassName("cont");
// console.log(cont);
// console.log(cont.length);

//Insertamos los numeros en los divs
function insertar(){
    for (var i = 0; i < cont.length; i++) {
    cont[i].innerText = numeros[i];
    // console.log(cont[i]);
}}
insertar();


//Funcion para intercambiar los valores
function intercambiar(i, j) {
    // console.log(cont[i].innerHTML, cont[j].innerHTML);
    var aux = cont[i].innerHTML;
    // console.log(aux);
    cont[i].innerText = cont[j].innerHTML;
    cont[j].innerText = aux;
}

//Funcion para comprobar que estén ordenados
function comprobar() {
    var numOrder = numeros.sort();
    // console.log("numorder" + numOrder)
    var numUser = [];
    for (var i = 0; i < cont.length; i++) {
        numUser.push(cont[i].innerHTML);
    }
    // console.log("num user" + numUser);
    var span = document.getElementById("check");

    if (numOrder.toString() == numUser.toString()) {
        span.style.color = "green";
        span.innerHTML = "Bien hecho!";
        var invert = document.getElementById("invertir");
        var botonInvert = document.createElement("button");
        botonInvert.innerText = "Invertir";
        botonInvert.setAttribute("onclick","invertir()");
        invert.appendChild(botonInvert);
    } else {
        span.style.color = "red";
        span.innerHTML = "Mal :(";
    }
}

function invertir(){
    numeros.reverse();
    insertar();
}

function ordenar(){
    numeros.sort();
    insertar();
}