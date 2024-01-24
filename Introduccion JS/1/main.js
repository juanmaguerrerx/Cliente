function numLet(palabra, letra) {
    var times = 0;
    for (var i = 0; i < palabra.length; i++){
        if (palabra.charAt(i) == letra.charAt(0)){
            console.log(palabra.charAt(i)+" "+letra.charAt(i)+" "+i);
            times++;
            console.log(palabra+" "+" "+letra+" "+times);
        }
    }
    return times;
}