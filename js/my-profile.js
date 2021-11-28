let datosModificados = {};
let datosRecuperados = JSON.parse(sessionStorage.getItem('datos'));


function mostrarDatosHTML(){
    
    document.getElementById("nombresHTML").innerHTML = datosModificados.nombres;
    document.getElementById("apellidosHTML").innerHTML = datosModificados.apellidos;
    document.getElementById("edadHTML").innerHTML = datosModificados.edad;
    document.getElementById("correoHTML").innerHTML = datosModificados.email;
    document.getElementById("telHTML").innerHTML = datosModificados.telefono;
}
function recarga(){
    if (sessionStorage.getItem("datos")){
        document.getElementById("nombresHTML").innerHTML = datosRecuperados.nombres;
        document.getElementById("apellidosHTML").innerHTML = datosRecuperados.apellidos;
        document.getElementById("edadHTML").innerHTML = datosRecuperados.edad;
        document.getElementById("correoHTML").innerHTML = datosRecuperados.email;
        document.getElementById("telHTML").innerHTML = datosRecuperados.telefono;
    }
}



document.addEventListener("DOMContentLoaded", function (e) {
    

    let formInfo = document.getElementById("editform");

    formInfo.addEventListener('submit', function (e) {
        e.preventDefault();

        let nombresNuevos = document.getElementById("nombresModif").value;
        let apellidosNuevos = document.getElementById("apellidosModif").value;
        let edadNueva = document.getElementById("edadModif").value;
        let emailNuevo = document.getElementById("emailModif").value;
        let telNuevo = document.getElementById("telModif").value;

        let datos = {
            nombres: nombresNuevos,
            apellidos: apellidosNuevos,
            edad: edadNueva,
            email: emailNuevo,
            telefono: telNuevo
        }
        
        
        sessionStorage.setItem('datos', JSON.stringify(datos));
        datosModificados = JSON.parse(sessionStorage.getItem('datos'));
        document.getElementById('editModal').style.display='none';
        mostrarDatosHTML();
    });



});