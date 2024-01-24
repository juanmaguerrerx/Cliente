var formulario = document.getElementsByTagName("form")[0];
var votosTotales = 1;
var votosSi = 0;
var votosNo = 0;
var votosNSNC = 0;

function votar(){
    var botonPulsado;
    document.getElementById("votosTotales").innerHTML = votosTotales;
    if (document.getElementById("si").checked){
        votosTotales++;
        votosSi++;
        document.getElementById("votosSi").innerHTML = votosSi;
        document.getElementById("img_si").style.width = votosSi*2 + "px";
    }else if (document.getElementById("no").checked){
        votosTotales++;
        votosNo++;
        document.getElementById("votosNo").innerHTML = votosNo;
        document.getElementById("img_no").style.width = votosNo*2 + "px";
    }else if (document.getElementById("nsnc").checked){
        votosTotales++;
        votosNSNC++;
        document.getElementById("votosNSNC").innerHTML = votosNSNC;
        document.getElementById("img_nsnc").style.width = votosNSNC*2 + "px";
    }
}

function nuevaOpcion(){
    var opcion = document.getElementById("opcion").value;
    var input = document.createElement("input");
    input.setAttribute("type","radio");
    
    console.log(opcion);    
}