new Vue({
    el: '#app',
    data: {
      numero1: 0,
      numero2: 0,
      resultado: 0,
      resultadoVisible: false  // Agregamos una nueva propiedad para controlar la visibilidad del resultado
    },
    methods: {
      sumar() {
        // Verificar si ambos números son mayores que cero
        if (this.numero1 > 0 || this.numero2 > 0) {
          // Convertir los valores a números y realizar la suma
          const resultado = parseFloat(this.numero1) + parseFloat(this.numero2);
          // Asignar el resultado a la propiedad 'resultado' en el modelo de datos
          this.resultado = resultado;
          // Mostrar la caja del resultado
          this.resultadoVisible = true;
        } else {
          // Si uno de los números no es mayor que cero, ocultar la caja del resultado
          this.resultadoVisible = false;
        }
      }
    }
  });