var formulario = document.getElementById("formulario");

console.log(formulario);

function op(b){
    

    var resultado = 0;
    
    switch (b.value){
        case "+":
            resultado = numero1 + numero2;break;
        case "-":
            resultado = numero1 - numero2;break;
        case "*":
            resultado = numero1 * numero2;break;
        case "/":
            resultado = numero1 / numero2;break;
    }
    console.log(resultado);
    var pRes = document.getElementById("resultado");
    pRes.innerHTML = resultado;
}