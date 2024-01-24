function haveNum(frase) {
    var bool = false;
    for (var i = 0; i < frase.length; i++) {
        console.log(frase.charAt(i));
        if (!isNaN(frase.charAt(i)) && frase.charAt(i) != " ") {
            console.log(frase.charAt(i));
            console.log(bool);
            return true;
        }
    }
    return bool;
}

function countLet(frase) {
    var count = 0;

    for (var i = 0; i < frase.length; i++) {
        if(isNaN(frase.charAt(i)) && frase.charAt(i) != " "){
            count++;

        }
    }

    return count;

}

function countNum(frase) {
    var count = 0;

    for (var i = 0; i < frase.length; i++) {
        if (!isNaN(frase.charAt(i)) && frase.charAt(i) != " ") {
            count++;
        }
    }
    return count;
}