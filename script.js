document.addEventListener("DOMContentLoaded", function () {

    console.log("El documento está completamente cargado.");

    const form = document.getElementById("registration-form");
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("emailError");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const confirmPasswordError = document.getElementById("confirmPasswordError");


    const mensajeExito = document.createElement("span"); // Mensaje de éxito
    form.appendChild(mensajeExito); // Agregar mensaje al formulario

    //Aquí Actualizamos la barra de Fuerza de La contraseña 
    passwordInput.addEventListener("input", evaluarFuerza);

    //Aquí Actualizamos la Contraseña Generada 
    document.getElementById("generar-contra").addEventListener("click", generarContra);


    // Evento de envío del formulario
    form.addEventListener("submit", function (event) {

        event.preventDefault(); // Evitar envío si hay errores
        resetErrors();

        let formValido = true;

        // Validar correo electrónico
        if (!validarEmail(emailInput.value)) {
            mostrarError(emailError, emailInput, "Por favor, ingrese un correo electrónico válido.");
            formValido = false;
        }

        // Validar que las contraseñas coincidan
        if (passwordInput.value !== confirmPasswordInput.value) {
            mostrarError(confirmPasswordError, confirmPasswordInput, "Las contraseñas no coinciden.");
            formValido = false;
        }

        if(!verificarCaptcha()){
            formValido=false;
        }

        // Si el formulario es válido, mostrar mensaje de éxito
        if (formValido) {
            mensajeExito.textContent = "¡Todo está correcto! El formulario se ha enviado correctamente.";
            mensajeExito.style.color = "green";
        }


    

    });

 
   
    // Función para mostrar errores
    function mostrarError(spanError, input, mensaje) {
        spanError.textContent = mensaje;
        input.classList.add("error");
    }

    // Función para resetear errores
    function resetErrors() {
        emailError.textContent = "";
        confirmPasswordError.textContent = "";
        emailInput.classList.remove("error");
        confirmPasswordInput.classList.remove("error");
        mensajeExito.textContent = "";
    }


});



// Función para validar el formato del correo electrónico
   function validarEmail(email) {
    // Asegurarnos de que el correo contenga al menos un @ y un dominio
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
}


//Funcion para ver la contraseña y la confirmacion de contraseña a voluntad 
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

//Funcion Barra de Fuerza de Contraseña
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


function generarContra() {

    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";
    let passwordGenerada = "";
    const longitud = 12; // Longitud de la contraseña

    for (let i = 0; i < longitud; i++) {
        const randomIndex = Math.floor(Math.random() * caracteres.length);
        passwordGenerada += caracteres[randomIndex];
    }

    document.getElementById("password").value = passwordGenerada;
    evaluarFuerza();
}




// Captcha 

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



