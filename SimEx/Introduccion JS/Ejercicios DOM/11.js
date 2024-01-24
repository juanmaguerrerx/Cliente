var links = document.getElementsByTagName("a");

function numLinks(){
    console.log(links.length);
    return links.length;
}

function getLastLink(){
    var link = links[links.length-2].getAttribute("href");
    console.log(link);  
    return link;
}

function numPruebas(){
    var count = 0;
    for (var i = 0; i < links.length; i++){
        if (links[i].getAttribute("href")=="http://prueba"){
            count++;
        }
    }
    return count;
}

function links3Par(){
    return document.getElementsByTagName("p")[3].getElementsByTagName("a").length;
}

function parrafito(){
    var parrafo = document.createElement("p");
    var escrito = document.getElementsByTagName("textarea")[0].innerHTML;
    var texto = document.createTextNode(escrito);
    
    parrafo.appendChild(texto);

    document.body.appendChild(parrafo);
}

function remover(){
    var ultParrafo = document.getElementsByTagName("p");
    ultParrafo = ultParrafo[ultParrafo.length-1];
    ultParrafo.parentNode.removeChild(ultParrafo);
}