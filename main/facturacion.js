const firebaseConfig = {
  apiKey: "AIzaSyAQZlAyXXuZOtovNEp1FuavyO8dY3lXPHw",
  authDomain: "marco-peluqueria.firebaseapp.com",
  databaseURL: "https://marco-peluqueria-default-rtdb.firebaseio.com",
  projectId: "marco-peluqueria",
  storageBucket: "marco-peluqueria.appspot.com",
  messagingSenderId: "454376161754",
  appId: "1:454376161754:web:627d59c97b59048bcac0e3"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

var listaProductos = document.getElementById('listaProductosPorVender');
var total = 0;

function agregarProducto() {
  var valor = document.getElementById('producto').value.toString();
  var cantidad = parseInt(document.getElementById('cantidad').value);
  var cliente = document.getElementById('cliente').value;
  var dni = document.getElementById('dni').value;
  var tipoCliente = document.getElementById('tipo-cliente').value;

  document.getElementById('clienteData').textContent = cliente;
  document.getElementById('dniData').textContent = dni;

  obtenerDatosProducto(valor, cantidad, cliente, dni, tipoCliente);
}


function obtenerDatosProducto(valor, cantidad, cliente, dni, tipoCliente) {
  var ref = firebase.database().ref('productos');
  var queryById = ref.orderByChild('id').equalTo(valor);
  var queryByNombre = ref.orderByChild('nombre').equalTo(valor);

  // Primero, intentamos buscar por ID
  queryById.once('value', function(snapshot) {
    var productoEncontrado = null;
    var productoKey = null;
    snapshot.forEach(function(childSnapshot) {
      productoEncontrado = childSnapshot.val();
      productoKey = childSnapshot.key;
    });

    // Si encontramos el producto por ID, procedemos
    if (productoEncontrado) {
      var nombre = productoEncontrado.nombre;
      var precio = productoEncontrado.precio;
      var tipoProducto = productoEncontrado.tipo;
      var productoCantidad = productoEncontrado.cantidad;

      if (productoCantidad >= cantidad) {
        calcularDescuento(tipoCliente, tipoProducto, precio).then(function(precioActualizado) {
          precio = precioActualizado;

          var nuevoProducto = document.createElement('li');
          nuevoProducto.textContent = 'Producto: ' + nombre + ', Cantidad: ' + cantidad + ', Precio: $' + (precio * cantidad);

          listaProductos.appendChild(nuevoProducto);

          total += precio * cantidad;

          // Actualizar la cantidad de productos en la base de datos
          ref.child(productoKey).update({ cantidad: productoCantidad - cantidad });

          document.getElementById('producto').value = '';
          document.getElementById('cantidad').value = '';

          mostrarTotal();
        }).catch(function(error) {
          mostrarMensaje('Error al calcular el descuento');
        });
      } else {
        mostrarMensaje('No hay suficiente cantidad disponible');
      }
    } else {
      // Si no encontramos el producto por ID, buscamos por nombre
      queryByNombre.once('value', function(snapshot) {
        var productoEncontrado = null;
        var productoKey = null;
        snapshot.forEach(function(childSnapshot) {
          productoEncontrado = childSnapshot.val();
          productoKey = childSnapshot.key;
        });

        if (productoEncontrado) {
          var nombre = productoEncontrado.nombre;
          var precio = productoEncontrado.precio;
          var tipoProducto = productoEncontrado.tipo;
          var productoCantidad = productoEncontrado.cantidad;

          if (productoCantidad >= cantidad) {
            calcularDescuento(tipoCliente, tipoProducto, precio).then(function(precioActualizado) {
              precio = precioActualizado;

              var nuevoProducto = document.createElement('li');
              nuevoProducto.textContent = 'Producto: ' + nombre + ', Cantidad: ' + cantidad + ', Precio: $' + (precio * cantidad);

              listaProductos.appendChild(nuevoProducto);

              total += precio * cantidad;

              // Actualizar la cantidad de productos en la base de datos
              ref.child(productoKey).update({ cantidad: productoCantidad - cantidad });

              document.getElementById('producto').value = '';
              document.getElementById('cantidad').value = '';

              mostrarTotal();
            }).catch(function(error) {
              mostrarMensaje('Error al calcular el descuento');
            });
          } else {
            mostrarMensaje('No hay suficiente cantidad disponible');
          }
        } else {
          mostrarMensaje('Producto no encontrado');
        }
      });
    }
  });
}





function mostrarTotal() {
  var totalElement = document.getElementById('total');
  totalElement.textContent = 'Total: $' + total;
}

function calcularDescuento(tipoCliente, tipoProducto, precio) {
  var descuentosRef = firebase.database().ref('descuentos');
  var descuentoKey = tipoCliente.charAt(0).toUpperCase() + tipoCliente.slice(1) + tipoProducto.charAt(0).toUpperCase() + tipoProducto.slice(1);

  return descuentosRef.child(descuentoKey).once('value').then(function(snapshot) {
    var descuento = snapshot.val();
    if (descuento) {
      return precio - (precio * descuento / 100);
    } else {
      return precio;
    }
  });
}

function mostrarMensaje(mensaje) {
  var mensajeElement = document.getElementById('mensaje');
  mensajeElement.textContent = mensaje;
  setTimeout(function() {
    mensajeElement.textContent = '';
  }, 3000);
}


// Obtener el elemento <span> por su ID
var spanFecha = document.getElementById('fechaData');

// Obtener la fecha actual
var fechaActual = new Date();

// Formatear la fecha en el formato deseado (por ejemplo: dd/mm/aaaa)
var dia = fechaActual.getDate();
var mes = fechaActual.getMonth() + 1; 
var anio = fechaActual.getFullYear();

// Asegurarse de que el día y el mes tengan siempre dos dígitos
if (dia < 10) {
  dia = '0' + dia;
}
if (mes < 10) {
  mes = '0' + mes;
}

// Construir la fecha en el formato deseado
var fechaFormateada = dia + '/' + mes + '/' + anio;

// Asignar la fecha formateada al contenido del <span>
spanFecha.textContent = fechaFormateada;