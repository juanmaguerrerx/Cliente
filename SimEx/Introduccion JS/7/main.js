function numPal(cadena){
    var cadenaSeparada = cadena.split(" ");
    return cadenaSeparada.length;
}
function first(cadena){
    var cadenaSeparada = cadena.split(" ");
    return cadenaSeparada[0];
}

function last(cadena){
    var cadenaSeparada = cadena.split(" ");
    return cadenaSeparada[cadenaSeparada.length - 1];
}

function reversa(cadena){
    var cadenaSeparada = cadena.split("");
    return cadenaSeparada.reverse();
}

function ordenAZ(cadena){
    var cadenaSeparada = cadena.split(" ").join("").split("");
    return cadenaSeparada.sort().join("");
}

function ordenZA(cadena){
    var cadenaSeparada = cadena.split("").join("").split("");
    return cadenaSeparada.sort().reverse().join("");
}