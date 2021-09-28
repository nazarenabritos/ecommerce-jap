var producto = [];

function showImages(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `;

        document.getElementById("productImages").innerHTML = htmlContentToAppend;
    };
};

function showComments(comments){
    let htmlComments = "";
    

    for(let i = 0; i < comments.length; i++){
        let score = comments[i].score;
        let starsHTML = "";

        for(let i = 0; i < score; i++){
            starsHTML += `
            <span class="fa fa-star checked"></span>`
            
        }

        for(let j = 0; j < 5 - score; j++){
            starsHTML += `
            <span class="fa fa-star"></span>`
        }

        htmlComments += `
        <hr>
        <div id="comment">
            <div class="stars">
                <h6>Puntuación: `+starsHTML+`</h6>
            </div>
            <h5>`+comments[i].description+`</h5>
        </div>
        <div class="small">
            <p>Usuario: `+comments[i].user+`</p>
            <p>`+comments[i].dateTime+`</p>
        </div>`;

        

        document.getElementById("allComments").innerHTML = htmlComments;
        
    };
    
};

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            producto = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
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

    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(comentarios){
        if (comentarios.status === "ok"){
            showComments(comentarios.data);
        };

    });
    let nombre = sessionStorage.getItem("usuario");
    document.getElementById("label").value = nombre;
});