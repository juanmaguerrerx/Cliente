function crearTabla() {
    var filas = document.getElementById("filas").value;
    var columnas = document.getElementById("columnas").value;
    var valor = document.getElementById("valor").value;

    console.log(filas, columnas, valor);
    var table = document.createElement("table");

    for (var i = 0; i < filas; i++) {
        var tr = document.createElement("tr");
        table.appendChild(tr);
        for (var j = 0; j < columnas; j++) {
            var td = document.createElement("td");
            td.setAttribute("onclick", "color(this)")
            tr.appendChild(td);
            table.appendChild(tr);
            td.innerHTML = valor;
        }
    }
    console.log(table);

    var cont = document.getElementById("tabla");
    cont.appendChild(table);

}

function color(b) {
    var color = document.getElementById("color");
    switch (color[color.selectedIndex].value) {
        case "blanco": b.style.backgroundColor = "white"; break;
        case "rojo": b.style.backgroundColor = "red"; break;
        case "azul": b.style.backgroundColor = "blue"; break;
        case "verde": b.style.backgroundColor = "green"; break;
        default: b.style.backgroundColor = "white"; break;
    }
}