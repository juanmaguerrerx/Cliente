function reverse(palabra) {
    var reverse = [];
    for (var i = 0; i < palabra.length; i++) {
        reverse[i] = palabra[palabra.length - i];
    }
    return reverse;
}


function isPalin(palabra) {
    var palin = true;
    var reverse = reverse(palabra);



    console.log(reverse);
    if (reverse.length == palabra.length) {
        for (var i = 0; i < palabra.length; i++) {
            if(reverse[i]!=palabra[i]){
                palin = false;
            }
        }
    } else alert("Error");
    return palin;
}

