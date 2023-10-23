import throttle from 'lodash.throttle'; // importo la biblioteca de lodash throttle

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.feedback-form');
  const emailInput = form.querySelector('input[name="email"]');
  const msnArea = form.querySelector('textarea[name="message"]');
  const storageKey = 'feedback-form.state';

  // Función para guardar el estado en el almacenamiento local
  const saveStateToLocalStorage = throttle(() => {
    const state = {
      email: emailInput.value,
      message: msnArea.value,
    };
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, 500);

  // Función para cargar el estado desde el almacenamiento local
  const loadStateFromLocalStorage = () => {
    const savedState = localStorage.getItem(storageKey);
    if (savedState) {
      const state = JSON.parse(savedState);
      emailInput.value = state.email;
      msnArea.value = state.message;
    }
  };

  // Cargar el estado al cargar la página
  loadStateFromLocalStorage();

  // Escuchar el evento de entrada en los campos de formulario
  emailInput.addEventListener('input', saveStateToLocalStorage);
  msnArea.addEventListener('input', saveStateToLocalStorage);

  // Manejar el envío del formulario
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Obtener los valores actuales de los campos
    const currentState = {
      email: emailInput.value,
      message: msnArea.value,
    };

    // Limpiar el almacenamiento local
    localStorage.removeItem(storageKey);

    // Emitir el objeto con los valores actuales a la consola
    console.log(currentState);

    // Restablecer los campos del formulario
    emailInput.value = '';
    msnArea.value = '';
  });
    
});