
function validar() {
    var bool = true;
    var nombre = document.getElementById("nombre");
    var valorNombre = nombre.value;

    var numero = document.getElementById("numero");
    var valorNumero = numero.value;

    var select = document.getElementById("select");

    var mail = document.getElementById("mail");
    var valorMail = mail.value;

    if (valorNombre == null || valorNombre.length == 0) {
        var spanNombre = document.getElementById("spanNombre");
        spanNombre.innerHTML = "Olbigatorio";
        spanNombre.style = "color:red;";
        return false;
    }
    if (valorNumero == null || valorNumero.length == 0) {
        return false;
    }
    if (!(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)/.test(valorMail))) {
        var spanMail = document.getElementById(spanMail);
        spanMail.innerHTML = "Formato incorrecto";
        spanMail.style = "color:red;";
        return false;
    }

    // validar mail--> if (!(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)/.test(elemento))) 
    return true;
}