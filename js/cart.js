const PREMIUM = 15;
const EXPRESS = 7;
const STANDARD = 5;
const CARD = "Targeta de credito"
const BANK = "Transferencia bancaria"
var articulos = [];
var subtotal = 0;
var porcentage = (subtotal * PREMIUM) / 100;
var guardarPorcentage = PREMIUM;

function showArticles() {

    document.getElementById("tableBody").innerHTML += `
        <tr>
            <td>
                <img src=${articulos.src} width="50px">
                ${articulos.name}
            </td>
            <td>${articulos.currency} ${articulos.unitCost}</td>
            <td>
                <input type="number" value="${articulos.count}" onchange="calculos(this.value,${articulos.unitCost})" min="0">
            </td>
            <td><strong>${articulos.currency}</strong><strong id="art">${articulos.unitCost * articulos.count}</strong></td>
        </tr>`;

    calculos(articulos.count, articulos.unitCost);
    document.getElementById("costoEnvio").innerHTML = porcentage;
    document.getElementById("costoTotal").innerHTML = subtotal + porcentage;

};

function calculos(cantidad, precio) {
    subtotal = cantidad * precio;
    document.getElementById("art").innerHTML = ` ${subtotal}`;
    document.getElementById("subTotal").innerHTML = subtotal;
    costoEnvio(guardarPorcentage);


};

function costoEnvio(opcion) {
    porcentage = (subtotal * opcion) / 100;
    document.getElementById("costoEnvio").innerHTML = porcentage;
    document.getElementById("costoTotal").innerHTML = subtotal + porcentage;
}

function formaDePago(mensaje) {
    if (mensaje === CARD) {
        document.getElementById("selecFormPago").innerHTML = mensaje;
        document.getElementById("cuentaB").setAttribute("disabled", "");
        document.getElementById("numeroTarjeta").removeAttribute("disabled", "");
        document.getElementById("codTarjeta").removeAttribute("disabled", "");


    } else if (mensaje === BANK) {
        document.getElementById("selecFormPago").innerHTML = mensaje;
        document.getElementById("numeroTarjeta").setAttribute("disabled", "");
        document.getElementById("codTarjeta").setAttribute("disabled", "");
        document.getElementById("cuentaB").removeAttribute("disabled", "");

    };
};


function validacionModal() {
    let valorCuenta = document.getElementById("cuentaB").value;
    let valorTarjeta = document.getElementById("numeroTarjeta").value;
    let valorCodTarjeta = document.getElementById("codTarjeta").value;

    if (valorCuenta === "" && document.getElementById("cuentaB").getAttribute("disabled") !== "") {
        document.getElementById("cuentaB").classList.add("is-invalid");
        document.getElementById("errorNumCuenta").innerHTML = "Completa este campo";
        document.getElementById("errores").innerHTML = "Faltan completar datos";

    } else {
        document.getElementById("cuentaB").classList.remove("is-invalid");
        document.getElementById("errorNumCuenta").innerHTML = "";
        document.getElementById("errores").innerHTML = "";
    }
    
    if (valorTarjeta === "" && document.getElementById("numeroTarjeta").getAttribute("disabled") !== "") {
        document.getElementById("numeroTarjeta").classList.add("is-invalid");
        document.getElementById("errorNumTarjeta").innerHTML = "Completa este campo";
        document.getElementById("errores").innerHTML = "Falta completar datos";

    } else {
        document.getElementById("numeroTarjeta").classList.remove("is-invalid");
        document.getElementById("errorNumTarjeta").innerHTML = "";
        document.getElementById("errores").innerHTML = "";
    };

    if (valorCodTarjeta === "" && document.getElementById("codTarjeta").getAttribute("disabled") !== "") {
        document.getElementById("codTarjeta").classList.add("is-invalid");
        document.getElementById("errorCodTarjeta").innerHTML = "Completa este campo";
        document.getElementById("errores").innerHTML = "Falta completar datos";

    } else {
        document.getElementById("codTarjeta").classList.remove("is-invalid");
        document.getElementById("errorCodTarjeta").innerHTML = "";
        document.getElementById("errores").innerHTML = "";
    };

    document.getElementById("guardarModal").setAttribute("data-dismiss", "modal");

};


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            articulos = resultObj.data.articles[0];
            showArticles();
        }
        document.getElementById("premium").addEventListener("click", function () {
            guardarPorcentage = PREMIUM;
            costoEnvio(PREMIUM);
        });
        document.getElementById("express").addEventListener("click", function () {
            guardarPorcentage = EXPRESS;
            costoEnvio(EXPRESS);
        });
        document.getElementById("standard").addEventListener("click", function () {
            guardarPorcentage = STANDARD;
            costoEnvio(STANDARD);
        });

    });
    document.getElementById("tarjeta").addEventListener("click", function () {
        document.getElementById("selecFormPago").style.color = "black";
        formaDePago(CARD);
        validacionModal();
    });
    document.getElementById("transferencia").addEventListener("click", function () {
        document.getElementById("selecFormPago").style.color = "black";
        formaDePago(BANK);
        validacionModal();
    });
    getJSONData(CART_BUY_URL).then(function (a) {
        document.getElementById("formBuy").addEventListener("submit", function () {
            alert(a.data.msg);
        });
        
    });
    

});
