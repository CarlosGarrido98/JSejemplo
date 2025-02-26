/**
 * Se ejecuta cuando el DOM ha sido completamente cargado.
 */
document.addEventListener("DOMContentLoaded", function () {

    console.log("El documento está completamente cargado.");
    const form = document.getElementById("registration-form");

    //Entradas
    const nameInput = document.getElementById("name");
    const lastNameInput = document.getElementById("lastname");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");

    // Errores
    const nameError = document.getElementById("nameError");
    const lastNameError = document.getElementById("lastnameError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");
    
    //Mensaje Formulario Correcto 
    const mensajeExito = document.createElement("span"); // Mensaje de éxito
    form.appendChild(mensajeExito); // Agregar mensaje al formulario

    //Aquí Actualizamos la barra de Fuerza de La contraseña 
    passwordInput.addEventListener("input", evaluarFuerza);

    //Aquí Actualizamos la Contraseña Generada 
    document.getElementById("generar-contra").addEventListener("click", generarContra);
/**
 * Agrega un evento que valida el campo del nombre cuando pierde el foco.
 */
nameInput.addEventListener("blur", function () {
    validarCampo(nameInput, nameError);
});

/**
 * Agrega un evento que valida el campo del apellido cuando pierde el foco.
 */
lastNameInput.addEventListener("blur", function () {
    validarCampo(lastNameInput, lastNameError);
});

/**
 * Agrega un evento que valida el campo de correo electrónico cuando pierde el foco.
 */
emailInput.addEventListener("blur", function () {
    validarCampoEmail(emailInput, emailError);
});

/**
 * Agrega un evento que muestra los requisitos de la contraseña cuando pierde el foco.
 */
passwordInput.addEventListener("blur", function () {
    mostrarRequisitos(passwordInput, passwordError);  
});

/**
 * Agrega un evento que valida la confirmación de la contraseña en cada entrada de texto.
 */
confirmPasswordInput.addEventListener("input", function () {
    confirmacionContra(passwordInput, confirmPasswordInput, confirmPasswordError);
});

/**
 * Agrega un evento que verifica la confirmación de la contraseña al escribir en el campo de contraseña.
 */
passwordInput.addEventListener("input", function () {
    confirmacionContra(passwordInput, confirmPasswordInput, confirmPasswordError);
});


/**
 * Agrega un evento al formulario para manejar el envío, previniendo el comportamiento por defecto y verificando el captcha.
 * 
 * @param {Event} event - Evento del formulario.
 */

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita que el formulario se envíe

        if (verificarCaptcha()) {
            mensajeExito.textContent = "✅ ¡El formulario se ha enviado correctamente!";
        } else {
            mensajeExito.textContent = "❌ Captcha incorrecto. Inténtalo de nuevo.";
            mensajeExito.style.color = "red";
        }
    });

});

//Fin DOM 
     //Funcion para saber si la cadena no tiene números ni carácteres especiales
     function validarCadena(valor) {
            return /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/.test(valor);
     }
    

    // Validar los campos de Nombre y Error 
    function validarCampo(input, errorElement) {
        if (validarCadena(input.value)) {
            errorElement.textContent = "✅ Texto válido";
            errorElement.style.color = "green";
        } else {
            errorElement.textContent = "❌ Por favor introduce un nombre válido (solo letras)";
            errorElement.style.color = "red";
        }
    }

    // Validar el campo del Email 
    function validarCampoEmail(input, errorElement) {
        if (validarEmail(input.value)) {
            errorElement.textContent = "✅ Correo válido";
            errorElement.style.color = "green";
        } else {
            errorElement.textContent = "❌ Introduce un correo válido (ejemplo@correo.com)";
            errorElement.style.color = "red";
        }
    }
    /**
     * Valida el formato de un correo electrónico.
     * @param {string} email - Correo electrónico a validar.
     * @returns {boolean} True si el correo es válido, False en caso contrario.
     */
   function validarEmail(email) {
    // Asegurarnos de que el correo contenga al menos un @ y un dominio
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
    }


    //Funcion para Mostrar los requisitos y tambien decirle al 
    function mostrarRequisitos(input, passwordError) {
        if (input.value.trim() === "") {
            passwordError.textContent = ""; // No mostrar nada si está vacío
        } else if(validarContraseña(input.value)){
            passwordError.textContent = "✅ Contraseña válida";
            passwordError.style.color = "green";
            
        }else {
            passwordError.textContent = "⚠️ La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial.";
            passwordError.style.color = "orange";
        }
    }

    //Funcion para validar la contraseña 
    function validarContraseña(pass) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return regex.test(pass);
    }


    //Funcion para ver si coinciden las contraseñas 
    function confirmacionContra(pass,repass,error){

        if(repass.value.trim() === ""){
        error.textContent="";
        } else if (pass.value !== repass.value) {
            error.textContent="Las Contraseñas no coinciden ❌";
            error.style.color = "red";
        }else{
            error.textContent="Las Contraseñas coinciden ✅";
            error.style.color = "green";
        }


    }


    /**
     * Alterna la visibilidad de la contraseña en un campo de entrada.
     * @param {string} inputId - ID del campo de entrada.
     * @param {HTMLElement} iconElement - Elemento del icono que cambia.
     */
    function contraEmoji(inputId,iconElement){
        const input = document.getElementById(inputId);

        //Si el tipo es password pasa esto 
        if(input.type=== "password"){
            input.type = "text"; // Enseñamos la contraseña
            iconElement.textContent ="🙈"//Cambiamos el icono
        }else{
            input.type = "password"; // Ocultar contraseña
            iconElement.textContent = "👁️"; // Restaurar icono
        }

    }


    /**
     * Evalúa la fuerza de una contraseña y actualiza la barra de indicador.
     */
    function evaluarFuerza() {

        const contraInput = document.getElementById("password");
        const fuerzaIndicador = document.getElementById("fuerza-indicador");
        const textoFuerza = document.getElementById("texto-fuerza");

        const password = contraInput.value;
        let fuerza = 0;

        if (password.length >= 8)   fuerza++; // 8 caracteres
        if (/[A-Z]/.test(password)) fuerza++; // mayúscula
        if (/[0-9]/.test(password)) fuerza++; // Al menos un número
        if (/[\W_]/.test(password)) fuerza++; //  Al menos un carácter especial

        // Actualizar la barra de fuerza
        if (fuerza === 1) {
            fuerzaIndicador.style.width = "25%";
            fuerzaIndicador.className = "debil";
            textoFuerza.textContent = "Fuerza: Débil 😞";
            textoFuerza.style.color = "red";
        } else if (fuerza === 2) {
            fuerzaIndicador.style.width = "50%";
            fuerzaIndicador.className = "medio";
            textoFuerza.textContent = "Fuerza: Media 😐";
            textoFuerza.style.color = "orange";
        } else if (fuerza === 3) {
            fuerzaIndicador.style.width = "75%";
            fuerzaIndicador.className = "medio";
            textoFuerza.textContent = "Fuerza: Buena 😊";
            textoFuerza.style.color = "blue";
        } else if (fuerza === 4) {
            fuerzaIndicador.style.width = "100%";
            fuerzaIndicador.className = "fuerte";
            textoFuerza.textContent = "Fuerza: Fuerte 💪";
            textoFuerza.style.color = "green";
        } else {
            fuerzaIndicador.style.width = "0%"; // Vacío si no cumple nada
            textoFuerza.textContent = "Fuerza:";
            textoFuerza.style.color = "black";
        }
    }

    /**
     * Genera una contraseña aleatoria y la establece en el campo de contraseña.
     */
    function generarContra() {
        const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";
        let passwordGenerada = "";
        const longitud = 12; // Longitud de la contraseña

        for (let i = 0; i < longitud; i++) {
            const randomIndex = Math.floor(Math.random() * caracteres.length);
            passwordGenerada += caracteres[randomIndex];
        }

         document.getElementById("password").value = passwordGenerada;
    
        passwordInput.value = passwordGenerada;
       
        evaluarFuerza();

        //disparar el evento input
        passwordInput.dispatchEvent(new Event("input"));

        }


    // Captcha 
    /**
     * Genera un captcha aleatorio.
     */
    let captcha = document.querySelector(".captcha");
    let refresh_button = document.querySelector(".refresh_button");
    let text = document.querySelector(".text");
    let submit = document.querySelector(".submit");
    let message = document.querySelector(".message");

    let string = "123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let generated_value = "";

    window.addEventListener("load" , generate_captcha);
    refresh_button.addEventListener("click" , generate_captcha);

    let letters = "";

    //Funcion para generar el Captcha

    function generate_captcha(){
            message.style.display = "none";

            generated_value = "";
            for (let i = 0; i < 5; i++) {
                generated_value += string[Math.floor(Math.random() * string.length)];
                // captcha.innerHTML = generated_value;
                captcha.innerHTML = generated_value.split("").map((letter , index) => `<p>`+ letter +`</p>`).join("");
            }

            letters = captcha.querySelectorAll("p");

            let random_number1 = Math.floor(Math.random() * 5);
            let random_number2 = Math.floor(Math.random() * 5);
            let random_number3 = Math.floor(Math.random() * 5);

            letters[random_number1].style.margin = "0px 3px";
            letters[random_number1].style.rotate = "30deg";

            letters[random_number2].style.margin = "0px 4px";
            letters[random_number2].style.rotate = "-20deg";
            letters[random_number2].style.fontWeight = "bold";
            letters[random_number2].style.transform = "translateY(10px)";

            letters[random_number3].style.margin = "0px 4px";
            letters[random_number3].style.rotate = "35deg";
            letters[random_number3].style.transform = "translateY(-10px)";
    }

    letters = document.querySelectorAll("p");

    // Validar el Captcha
    /**
     * Verifica si el captcha ingresado es correcto.
     * @returns {boolean} True si el captcha es correcto, False en caso contrario.
     */
    function verificarCaptcha(){
        let combined_letters = "";

        for (let c = 0; c < letters.length; c++) {
            const element = letters[c];
            combined_letters += element.innerText;
            
        }
        if(text.value === combined_letters){
            message.style.display = "block";
            message.style.color = "green";
            message.innerHTML = "Captcha Correcto ";
            return true;

        }else{
            message.style.display = "block";
            message.style.color = "red";
            message.innerHTML = "Introduzca el Captcha Correctamente";
            return false;
        }

    
    }



