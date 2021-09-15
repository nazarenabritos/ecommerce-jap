let boton = document.getElementById("boton");
boton.addEventListener("click", function(evento){
    evento.preventDefault();
    let nombre = document.getElementById("usuario").value;
    sessionStorage.setItem("usuario", nombre);
    let pass = document.getElementById("pass").value;
    sessionStorage.setItem("password", pass);
    sessionStorage.setItem("logueado", true);
    if(nombre !== "" && pass !== "" && sessionStorage.getItem("password").length >= 8){
     window.location.href = "index.html";
    };
});

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    
});