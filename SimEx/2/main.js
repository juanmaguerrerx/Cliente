var stotal = 0;

var tienda = [
    { codigo: "001", descripcion: "Producto 1", precio: 10.99 },
    { codigo: "002", descripcion: "Producto 2", precio: 15.99 },
    { codigo: "003", descripcion: "Producto 3", precio: 19.99 },
    { codigo: "004", descripcion: "Producto 4", precio: 24.99 },
    { codigo: "005", descripcion: "Producto 5", precio: 12.49 },
    { codigo: "006", descripcion: "Producto 6", precio: 9.99 },
    { codigo: "007", descripcion: "Producto 7", precio: 29.99 },
    { codigo: "008", descripcion: "Producto 8", precio: 7.99 },
    { codigo: "009", descripcion: "Producto 9", precio: 16.99 },
    { codigo: "010", descripcion: "Producto 10", precio: 14.99 }
];



function insertar() {
    var codigo = document.getElementById("codigo").value;
    console.log(codigo);
    var descripcion = document.getElementById("descripcion").value;
    console.log(descripcion);
    var cantidad = document.getElementById("cantidad").value;
    console.log(cantidad);
    var precio = document.getElementById("precio").value;
    console.log(precio);

    var producto = document.createElement("p");
    producto.innerText = "Descripcion: " + descripcion + "\n Precio: " + precio;

    stotal += parseInt(precio) * parseInt(cantidad);

    var prods = document.getElementById("productos");
    prods.appendChild(producto);

    var subtotal = document.getElementById("subtotal");
    subtotal.innerText = stotal + "€";
    
}