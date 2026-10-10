const propietario = document.getElementById("propietario");
const empleados = document.getElementById("empleados");

const btnlogin2 = document.getElementById("btnlogin2");
const btnLogin = document.getElementById("btnLogin");

const descripcion = document.getElementById("descripcion");
const error = document.getElementById("error");

const verPassword = document.getElementById("verPassword");
const password = document.getElementById("password");

const user = document.getElementById("usuario");






propietario.addEventListener("click", () => {

    propietario.classList.add("activo");
    empleados.classList.remove("activo");

    descripcion.innerHTML =
        "Esta opción de inicio de sesión es exclusiva para los propietarios de restaurantes que desean monitorear y tener acceso a todas las funciones administrativas del negocio.";

    btnlogin2.style.display = "none";
    btnLogin.style.display = "block ";
    btnLogin.style.margin = "0 auto ";


    user.value = "";
    password.value = "";
     error.innerHTML= "";
    

    password.type = "password";

    verPassword.classList.remove("fa-eye-slash");
    verPassword.classList.add("fa-eye");
    
});


empleados.addEventListener("click", () => {

    empleados.classList.add("activo");
    propietario.classList.remove("activo");

    descripcion.innerHTML =
        "Esta opción permite a los empleados ingresar al sistema para gestionar las funciones asignadas dentro del restaurante.";

    btnLogin.style.display = "none";
    btnlogin2.style.display = "block";
    btnlogin2.style.margin = "0 auto ";

    
    

    user.value = "";
    password.value = "";
    error.innerHTML= "";

    password.type = "password";

    verPassword.classList.remove("fa-eye-slash");
    verPassword.classList.add("fa-eye");

   
    
});


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

btnLogin.addEventListener("click", async () => {

    if (user.value.trim() === "" || password.value.trim() === "") {
        error.innerHTML = "Campos vacíos";
        return;
    }

    const respuesta = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: user.value.trim(),
            contrasena: password.value.trim()
        })
    });

    if (respuesta.ok) {
        window.location.replace("/adm_ini/mostrar.html");
    } else {
        error.innerHTML = "Usuario o contraseña incorrecta";
    }

});
btnlogin2.addEventListener("click", ()=>{
    window.location.replace("/nn.html")
})

