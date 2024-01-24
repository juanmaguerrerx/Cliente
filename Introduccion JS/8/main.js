function stats(){
    var texto = document.getElementById("text").innerText;
    var vocales = ["a","e","i","o","u"];
    var countVocal =[];
    var estadisticas = "";
    for (var i = 0; i < vocales.length - 1; i++){
        countVocal[i] = contarVocal(texto,vocales[i]);
        estadisticas+="La vocal "+vocales[i]+" aparece "+countVocal[i]+" veces.<br>";
        estadisticas+="Eso es un porcentaje de: "+(countVocal[i]/(texto.split(" ").join("").split("").length)*100).toFixed(2)+" % <br>";
    }
    console.log(countVocal);
    console.log(estadisticas);
    var stat = document.getElementById("estadisticas");
    stat.innerText = estadisticas;
}

function contarVocal(texto,vocal){
    var countVocal = 0;
    for  (var i= 0; i < texto.length; i++){
        if (texto.charAt(i)==vocal){
            countVocal++;
        }
    }
    return countVocal;
}