function tabla(numero){
    numero = parseInt(numero);
    for (var i = 1; i < 10; i++){
        document.write(i + " * "+numero+" = "+i*numero+"<br>");
    }
}