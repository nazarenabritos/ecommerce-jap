const PREMIUM = 15;
const EXPRESS = 7;
const STANDARD = 5;
var articulos = [];
var subtotal = 0;
var porcentage = (subtotal * PREMIUM) / 100;
var guardarPorcentage = PREMIUM;

function showArticles(){
        
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

function calculos(cantidad, precio){
    subtotal = cantidad * precio;
    document.getElementById("art").innerHTML = ` ${subtotal}`;
    document.getElementById("subTotal").innerHTML = subtotal;
    costoEnvio(guardarPorcentage);


};

function costoEnvio(opcion){
    porcentage = (subtotal * opcion) / 100;
    document.getElementById("costoEnvio").innerHTML = porcentage;
    document.getElementById("costoTotal").innerHTML = subtotal + porcentage;
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            articulos = resultObj.data.articles[0];
            showArticles();
        }
        document.getElementById("premium").addEventListener("click", function(){
            guardarPorcentage = PREMIUM;
            costoEnvio(PREMIUM);
        });
        document.getElementById("express").addEventListener("click", function(){
            guardarPorcentage = EXPRESS;
            costoEnvio(EXPRESS);
        });
        document.getElementById("standard").addEventListener("click", function(){
            guardarPorcentage = STANDARD;
            costoEnvio(STANDARD);
        });
    });
});
//