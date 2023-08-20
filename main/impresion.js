window.imprimirFactura = function() {
  // Obtener los valores de los elementos HTML
  var cliente = document.getElementById("clienteData").textContent;
  var dni = document.getElementById("dniData").textContent;
  var tipoCliente = document.getElementById("tipo-cliente").value;
  var total = document.getElementById("total").textContent;
  var fecha = document.getElementById("fechaData").textContent;


 
  // Crear un objeto con los datos a enviar
  var datos = {
    cliente: cliente,
    dni: dni,
    tipoCliente: tipoCliente,
    total: total,
    fecha: fecha

  };

  // Obtener una referencia a la base de datos de Firebase
  var database = firebase.database();

  // Guardar los datos en la base de datos
  database.ref("historial").push(datos);

  // Redirigir al menú de impresión
  window.print();
};

          