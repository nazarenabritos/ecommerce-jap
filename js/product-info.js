var producto = [];
var productoRel = [];

function showImages(array) {

    let htmlContentToAppend = "";
    var i = 0;
    array.forEach(imageSrc=>{
        if (i==0){
            htmlContentToAppend+= "<div class='carousel-item active'>  <img class='img-thumbnail dblock w-100'  src=" +imageSrc+" alt='"+imageSrc+ "' width=100 height=300> </div>";
            } else{
            htmlContentToAppend+= "<div class='carousel-item '>  <img class='img-thumbnail dblock w-100'  src=" +imageSrc+" alt='"+imageSrc+ "' width=100 height=300> </div>";
        }
        i++;
    });
    document.getElementById("productImages").innerHTML = htmlContentToAppend;
    
        
    
};

function showComments(comments) {
    let htmlComments = "";


    for (let i = 0; i < comments.length; i++) {
        let score = comments[i].score;
        let starsHTML = "";

        for (let i = 0; i < score; i++) {
            starsHTML += `
            <span class="fa fa-star checked"></span>`

        }

        for (let j = 0; j < 5 - score; j++) {
            starsHTML += `
            <span class="fa fa-star"></span>`
        }

        htmlComments += `
        <hr>
        <div id="comment">
            <div class="stars">
                <h6>Puntuación: `+ starsHTML + `</h6>
            </div>
            <h5>`+ comments[i].description + `</h5>
        </div>
        <div class="small">
            <p>Usuario: `+ comments[i].user + `</p>
            <p>`+ comments[i].dateTime + `</p>
        </div>`;



        document.getElementById("allComments").innerHTML = htmlComments;

    };

};

function relacionado() {

};

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {

        if (resultObj.status === "ok") {
            producto = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productPriceHTML = document.getElementById("productCost");
            let productCriteriaHTML = document.getElementById("productCriteria");
            let productSoldCountHTML = document.getElementById("productSoldCount");

            productNameHTML.innerHTML = producto.name;
            productDescriptionHTML.innerHTML = producto.description;
            productPriceHTML.innerHTML = producto.currency + " " + producto.cost;
            productCriteriaHTML.innerHTML = producto.category;
            productSoldCountHTML.innerHTML = producto.soldCount;

            showImages(producto.images);


        };
        getJSONData(PRODUCTS_URL).then(function (resultO) {
            let productoS = resultO.data;
            productoRel = producto.relatedProducts;
            let contenido = "";
            productoRel.forEach(i => {
                contenido += `
                <a href="#" class="enlaceRel">
                    <div class="productRel">
                        <img class="imgRel" src="${productoS[i].imgSrc}" alt="${productoS[i].name}">
                        <hr>
                        <div class="descripRel">
                            <h5>${productoS[i].name}</h5>
                            <h6>${productoS[i].currency}${productoS[i].cost}</h6>
                        </div>
                    </div>
                </a>`;
            });

            document.getElementById("prodRelacionados").innerHTML = contenido;

        });

    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (comentarios) {
        if (comentarios.status === "ok") {
            showComments(comentarios.data);
        };

    });
    let nombre = sessionStorage.getItem("usuario");
    document.getElementById("label").value = nombre;
});