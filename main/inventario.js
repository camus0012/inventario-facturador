
    
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
      
      // Obtener una referencia a la base de datos
      var database = firebase.database();
      
      var productos = []; // Arreglo para almacenar los productos
      var productosListener; // Listener para cambios en la base de datos
      
      // Escuchar cambios en la base de datos y actualizar la lista de productos
      productosListener = database.ref("productos").on("value", function(snapshot) {
        productos = []; // Vaciar el arreglo antes de cargar los productos
      
        snapshot.forEach(function(childSnapshot) {
          var producto = childSnapshot.val();
          producto.key = childSnapshot.key; // Agregar la propiedad key al producto
          productos.push(producto);
        });
      
        mostrarProductos(); // Mostrar los productos después de cargarlos
        mostrarProductosVencidos(); // Mostrar los productos vencidos después de cargarlos
      });
      
      function mostrarProductos() {
        var listaProductos = document.getElementById("listaProductos");
      
        // Vaciar la lista antes de mostrar los productos
        listaProductos.innerHTML = "";
      
        // Mostrar los productos en la lista
        productos.forEach(function(producto) {
          var li = document.createElement("li");
          li.innerHTML = `
            <pre>ID: ${producto.id}</pre>
            <pre>Nombre: ${producto.nombre}</pre>
            <pre>Vencimiento: ${producto.vencimiento}</pre>
            <pre>Precio: $${producto.precio}</pre>
            <pre>Cantidad: ${producto.cantidad}</pre>
            <pre>Tipo: ${producto.tipo}</pre>
            <button onclick="editarPrecio('${producto.key}', ${producto.precio})">Editar Precio</button>
            <button onclick="editarCantidad('${producto.key}', ${producto.cantidad})">Editar Cantidad</button>
            <button onclick="eliminarProducto('${producto.key}')">Eliminar</button>
          `;
      
          listaProductos.appendChild(li);
        });
      
        ocultarProductos(); // Ocultar los productos
      }
      
      // Función para ocultar los productos en la lista
      function ocultarProductos() {
        var listaProductos = document.getElementById("listaProductos");
        var lis = listaProductos.getElementsByTagName("li");
      
        for (var i = 0; i < lis.length; i++) {
          lis[i].style.display = "none";
        }
      }
      
      // Evento de envío del formulario para agregar productos
document.getElementById("formulario").addEventListener("submit", function(event) {
  event.preventDefault();

  // Obtener los valores del formulario
  var id = document.getElementById("id").value;
  var nombre = document.getElementById("nombre").value;
  var vencimiento = document.getElementById("vencimiento").value;
  var precio = parseFloat(document.getElementById("precio").value);
  var cantidad = parseInt(document.getElementById("cantidad").value);
  var tipo = document.getElementById("tipo").value;

  // Crear un objeto producto con los valores del formulario
  var producto = {
    id: id,
    nombre: nombre,
    vencimiento: vencimiento,
    precio: precio,
    cantidad: cantidad,
    tipo: tipo
  };

  // Agregar el producto a la base de datos
  database.ref("productos").push(producto);

  // Mostrar el mensaje de "Producto agregado correctamente"
  var mensaje = document.getElementById("mensaje");
  mensaje.innerText = "Producto agregado correctamente";
  mensaje.style.display = "block";

  // Ocultar el mensaje después de 3 segundos
  setTimeout(function() {
    mensaje.style.display = "none";
  }, 3000);

  // Limpiar el formulario
  document.getElementById("id").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("vencimiento").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("cantidad").value = "";
  document.getElementById("tipo").value = "";
});
      
      // Evento de búsqueda
      function buscar(event) {
        var query = event.target.value.toLowerCase();
        var resultados = [];
      
        if (query.length > 0) {
          resultados = productos.filter(function(producto) {
            return producto.nombre.toLowerCase().includes(query) || producto.id.includes(query);
          });
        }
      
        mostrarResultados(resultados);
      }
      
      // Función para mostrar los resultados de búsqueda
      function mostrarResultados(resultados) {
        var listaResultados = document.getElementById("resultadoBusqueda");
      
        // Vaciar la lista antes de mostrar los resultados
        listaResultados.innerHTML = "";
      
        // Mostrar los resultados en la lista
        resultados.forEach(function(resultado) {
          var li = document.createElement("li");
          li.innerHTML = `
            <pre> ID: ${resultado.id}</pre>
            <pre> Nombre: ${resultado.nombre}</pre>
            <pre> Precio: $${resultado.precio}</pre> 
            <button onclick="seleccionarProducto('${resultado.key}')">Seleccionar</button>
          `;
      
          listaResultados.appendChild(li);
        });
      
        ocultarProductos(); // Ocultar los productos
      }
      
      // Función para seleccionar un producto de la búsqueda
      function seleccionarProducto(key) {
        var index = productos.findIndex(function(producto) {
          return producto.key === key;
        });
      
        if (index !== -1) {
          ocultarProductos(); // Ocultar los productos
      
          var listaProductos = document.getElementById("listaProductos");
          var lis = listaProductos.getElementsByTagName("li");
          lis[index].style.display = "block"; // Mostrar el producto seleccionado
      
          listaProductos.scrollTop = index * 72; // Ajustar el desplazamiento para mostrar el producto seleccionado
        }
      }
      
      // Función para editar el precio de un producto
      function editarPrecio(key, precio) {
        var nuevoPrecio = prompt("Ingrese el nuevo precio:", precio);
      
        if (nuevoPrecio !== null) {
          nuevoPrecio = parseFloat(nuevoPrecio);
      
          if (!isNaN(nuevoPrecio)) {
            // Actualizar el precio en la base de datos
            database.ref("productos/" + key + "/precio").set(nuevoPrecio);
          }
        }
      }
      
      function editarCantidad(key, cantidad) {
        var nuevaCantidad = prompt("Ingrese la nueva cantidad:", cantidad);
      
        if (nuevaCantidad !== null) {
          nuevaCantidad = parseFloat(nuevaCantidad);
      
          if (!isNaN(nuevaCantidad)) {
            // Actualizar el precio en la base de datos
            database.ref("productos/" + key + "/cantidad").set(nuevaCantidad);
          }
        }
      }


      // Función para eliminar un producto
      function eliminarProducto(key) {
        if (confirm("¿Está seguro que desea eliminar este producto?")) {
          // Eliminar el producto de la base de datos
          database.ref("productos/" + key).remove();
        }
      }
      
      function mostrarProductosVencidos() {
        var listaProductosVencidos = document.getElementById("listaProductosVencidos");
        var fechaActual = new Date();
      
        // Calcular la fecha límite superior del rango (2 meses adicionales a la fecha actual)
        var fechaLimiteSuperior = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 2, fechaActual.getDate());
      
        // Vaciar la lista antes de mostrar los productos vencidos
        listaProductosVencidos.innerHTML = "";
      
        // Filtrar los productos vencidos o dentro del rango establecido
        var productosVencidos = productos.filter(function(producto) {
          var fechaVencimiento = new Date(producto.vencimiento);
          return fechaVencimiento <= fechaActual || fechaVencimiento <= fechaLimiteSuperior;
        });
      
        // Mostrar los productos vencidos en la lista
        productosVencidos.forEach(function(producto) {
          var li = document.createElement("li");
          li.innerHTML = `
            <pre> ID: ${producto.id}</pre>
            <pre> Nombre: ${producto.nombre}</pre>
            <pre> Vencimiento: ${producto.vencimiento}</pre>
            <pre> Precio: $${producto.precio}</pre>
            <pre> Cantidad: ${producto.cantidad}</pre>
          `;
      
          listaProductosVencidos.appendChild(li);
        });
      }
      
     
      
      // Obtén una referencia a la entrada de búsqueda
      var inputBusqueda = document.getElementById("busqueda");
      
      // Agrega un evento de escucha para la entrada de búsqueda
      inputBusqueda.addEventListener("input", buscar);

      
      