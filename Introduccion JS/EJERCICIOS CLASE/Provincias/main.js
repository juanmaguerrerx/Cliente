var arrayPueblos = [['Islantilla', 'Lepe', 'Huelva'], ['Alcalá de Guadaira', 'Carmona', 'Bormujos'], ['San Fernando', 'Cadiz', 'Barbate']];

function pueblos() {
    var select = document.getElementById("provincias");
    var elegido = select.options[select.selectedIndex].value;
    console.log(elegido);
    addPueblo(elegido);
}

function addPueblo(n) {
    var selPueblos = document.getElementById("pueblos");
    console.log("Length: ", selPueblos.options.length);
    selPueblos.innerHTML = "";
    n = parseInt(n);

    for (var i = 0; i < arrayPueblos[n].length; i++) {
        console.log("Pueblo: ", arrayPueblos[n][i], "\nArray de: [", n, i, "]");
        var option = document.createElement("option");
        option.text = arrayPueblos[n][i];
        selPueblos.add(option);
    }
}