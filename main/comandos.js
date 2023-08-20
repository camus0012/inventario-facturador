document.addEventListener('DOMContentLoaded', function () {
  // Selecciona el primer campo del formulario por su id y enfócalo
  document.getElementById('producto').focus();

  const fields = document.querySelectorAll('.formE input, .formE select');
  let currentField = 0;

  const addButton = document.querySelector('.button-container button');

  document.addEventListener('keydown', function (event) {
      // Verifica si se ha presionado la tecla "Ctrl" (código 17)
      if (event.keyCode === 17) {
          // Incrementa el índice para pasar al siguiente campo
          currentField = (currentField + 1) % fields.length;
          // Enfoca el siguiente campo
          fields[currentField].focus();
          // Previene el comportamiento predeterminado del evento (por ejemplo, abrir el menú de impresión en el navegador)
          event.preventDefault();
      }

      // Verifica si se ha presionado la tecla "Shift" (código 16)
      if (event.keyCode === 16) {
          // Previene el comportamiento predeterminado del evento
          event.preventDefault();
          // Simula el clic en el botón "Agregar"
          addButton.click();
      }
  });
});

        