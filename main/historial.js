
 
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

var historialListener; // Listener para cambios en la base de datos
var lista = []; // Arreglo de productos

// Escuchar cambios en la base de datos y actualizar la lista de productos
historialListener = database.ref("historial").on("value", function(snapshot) {
  lista = []; // Vaciar el arreglo antes de cargar los productos

  snapshot.forEach(function(childSnapshot) {
    var producto = childSnapshot.val();
    producto.key = childSnapshot.key; // Agregar la propiedad key al producto
    lista.push(producto);
  });
});

// Evento de búsqueda
function buscar(event) {
  var query = event.target.value.toLowerCase();
  var resultados = [];

  if (query.length > 0) {
    resultados = lista.filter(function(producto) {
      return (
        producto.cliente.toLowerCase().includes(query) ||
        producto.dni.includes(query) ||
        producto.tipoCliente.toLowerCase().includes(query) ||
        producto.fecha.toString().includes(query)
      );
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
      <pre> Tipo: ${resultado.tipoCliente}</pre> 
      <pre> Cliente: ${resultado.cliente}</pre>
      <pre> DNI: ${resultado.dni}</pre>
      <pre> Fecha: ${resultado.fecha}</pre>
      <pre> Total: ${resultado.total}</pre>
    `;

    listaResultados.appendChild(li);
  });
}

// Obtén una referencia a la entrada de búsqueda
var inputBusqueda = document.getElementById("busqueda");

// Agrega un evento de escucha para la entrada de búsqueda
inputBusqueda.addEventListener("input", buscar);
