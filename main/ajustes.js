
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
          
          // Función para agregar descuentos
function agregarDescuentos() {
            // Obtener los valores de los campos de descuento
            var descuentoProfesionalHerramientas = document.getElementById("descuentoProfesionalHerramientas").value;
            var descuentoMayoristaHerramientas = document.getElementById("descuentoMayoristaHerramientas").value;
            var descuentoProfesionalAccesorios = document.getElementById("descuentoProfesionalAccesorios").value;
            var descuentoMayoristaAccesorios = document.getElementById("descuentoMayoristaAccesorios").value;
            var descuentoProfesionalProductos = document.getElementById("descuentoProfesionalProductos").value;
            var descuentoMayoristaProductos = document.getElementById("descuentoMayoristaProductos").value;
          
            // Crear un objeto con los descuentos
            var descuentos = {
              ProfesionalHerramientas: descuentoProfesionalHerramientas,
              MayoristaHerramientas: descuentoMayoristaHerramientas,
              ProfesionalAccesorios: descuentoProfesionalAccesorios,
              MayoristaAccesorios: descuentoMayoristaAccesorios,
              ProfesionalProductos: descuentoProfesionalProductos,
              MayoristaProductos: descuentoMayoristaProductos
            };
          
            // Obtener una referencia a la base de datos de Firebase
            var database = firebase.database();
          
            // Actualizar los descuentos en la base de datos
            database.ref("descuentos").set(descuentos)
              .then(function() {
                // Limpiar el formulario
                document.getElementById("descuentoProfesionalHerramientas").value = "";
                document.getElementById("descuentoMayoristaHerramientas").value = "";
                document.getElementById("descuentoProfesionalAccesorios").value = "";
                document.getElementById("descuentoMayoristaAccesorios").value = "";
                document.getElementById("descuentoProfesionalProductos").value = "";
                document.getElementById("descuentoMayoristaProductos").value = "";
          
                // Mostrar mensaje de éxito en pantalla durante 3 segundos
                var mensaje = document.getElementById("mensaje");
                mensaje.innerText = "Descuentos agregados correctamente";
                mensaje.style.display = "block";
                setTimeout(function() {
                  mensaje.style.display = "none";
                }, 3000);
              })
              .catch(function(error) {
                console.log("Error al agregar los descuentos: " + error.message);
              });
          }
          