const registro = document.getElementById("registro");

const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");

const password = document.getElementById("contrasena");
const repetirPassword = document.getElementById("repetirPassword");
const rol = document.getElementById("rol");

const verPassword = document.getElementById("verPassword");
const verRepetirPassword = document.getElementById("verRepetirPassword");

const btnRegistro = document.getElementById("btnRegistro");
const btnVolver = document.getElementById("btnVolver");

const error = document.getElementById("error");


// MOSTRAR CONTRASEÑA
verPassword.addEventListener("click", () => {

    if (password.type === "password") {

        password.type = "text";

        verPassword.classList.remove("fa-eye");
        verPassword.classList.add("fa-eye-slash");

    } else {

        password.type = "password";

        verPassword.classList.remove("fa-eye-slash");
        verPassword.classList.add("fa-eye");

    }

});


// MOSTRAR REPETIR CONTRASEÑA
verRepetirPassword.addEventListener("click", () => {

    if (repetirPassword.type === "password") {

        repetirPassword.type = "text";

        verRepetirPassword.classList.remove("fa-eye");
        verRepetirPassword.classList.add("fa-eye-slash");

    } else {

        repetirPassword.type = "password";

        verRepetirPassword.classList.remove("fa-eye-slash");
        verRepetirPassword.classList.add("fa-eye");

    }

});


// BOTÓN VOLVER
btnVolver.addEventListener("click", () => {

    window.location.replace("../index.html");

});


// REGISTRAR USUARIO
registro.addEventListener("submit", async function (evento) {

    evento.preventDefault();


    // VALIDAR CAMPOS VACÍOS
    if (
        nombre.value.trim() === "" ||
        correo.value.trim() === "" ||
        password.value.trim() === "" ||
        repetirPassword.value.trim() === "" ||
        rol.value.trim()=== ""
    ) {

        error.innerHTML = "Todos los campos son obligatorios";
        error.style.color = "red";

        return;
    }


    // VALIDAR CONTRASEÑAS
    if (password.value !== repetirPassword.value) {

        error.innerHTML = "Las contraseñas no coinciden";
        error.style.color = "red";

        return;
    }

   
    


    // TOMAR LOS DATOS
    const nnombre = nombre.value;
    const ccorreo = correo.value;
    const ccontrasena = password.value;
    const rrol = rol.value
    


    try {

        // ENVIAR DATOS AL BACKEND
        const respuesta = await fetch(
            "http://localhost:3000/api/usuario",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    nombre: nnombre,
                    correo: ccorreo,
                    contrasena: ccontrasena,
                    id_rol: rrol,
                    
                })
            }
        );


        const datos = await respuesta.json();

        console.log(datos);


        if (respuesta.ok) {

            error.innerHTML = "Registro exitoso";
            error.style.color = "green";

            registro.reset();


            setTimeout(() => {

                error.innerHTML = "";

            }, 3000);

        } else {

            error.innerHTML = datos.error || "Error al registrar";
            error.style.color = "red";

        }


    } catch (errorServidor) {

        console.log("ERROR:", errorServidor);

        error.innerHTML = "No se pudo conectar con el servidor";
        error.style.color = "red";

    }

});