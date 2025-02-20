document.addEventListener('DOMContentLoaded', function () {

    console.log('El documento está completamente cargado.');
    const form = document.getElementById('registration-form');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');

    const successMessage = document.createElement('span'); // Mensaje de éxito

    // Agregamos el span al formulario (lo ponemos al final del formulario)
    form.appendChild(successMessage);

    // Agregar evento de envío del formulario
    form.addEventListener('submit', function (event) {
        // Evitar el envío del formulario si hay errores
        event.preventDefault();

        // Restablecer mensajes de error y éxito
        emailError.textContent = '';
        successMessage.textContent = '';
        emailInput.classList.remove('error'); // Eliminar clase de error

        let formIsValid = true;

        // Validar correo electrónico
        if (!validateEmail(emailInput.value)) {
            emailError.textContent = 'Por favor, ingrese un correo electrónico válido.';
            emailInput.classList.add('error');
            formIsValid = false;
        }

        // Si el formulario es válido, mostrar mensaje de éxito
        if (formIsValid) {
            successMessage.textContent = '¡Todo está correcto! El formulario se ha enviado correctamente.';
            successMessage.style.color = 'green'; // Establecemos el color del mensaje de éxito
        }
    });



    


 
    
});
   // Función para validar el formato del correo electrónico
   function validateEmail(email) {
    // Asegurarnos de que el correo contenga al menos un @ y un dominio
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
}