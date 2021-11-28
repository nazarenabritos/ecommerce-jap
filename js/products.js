const ORDER_ASC_BY_PRICE = "ASC";
const ORDER_DESC_BY_PRICE = "DESC";
const ORDER_BY_SOLD_COUNT = "Rel.";
var currentSortCriteria = undefined;
var currentProductsArray = [];
var minPrice = undefined;
var maxPrice = undefined;

function filterPriceList(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_SOLD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}


function showProductsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let prod = currentProductsArray[i];

        if (((minPrice == undefined) || (minPrice != undefined && parseInt(prod.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(prod.cost) <= maxPrice))){

            htmlContentToAppend += `
            <div class="col-12 col-md-4 card-deck">
                <a href="product-info.html" class="card mb-4 shadow-sm text-decoration-none">
                    <div class="align-self-center">
                        <img src="` + prod.imgSrc + `" alt="` + prod.description + `" class="bd-placeholder-img card-img-top">
                    </div>
                        
                    <div class="card-body text-dark">
                        <div class="card-text">
                            <h4 class="mb-3">`+ prod.name +`</h4>
                            <p class="mb-1">` + prod.description + `</p><br>
                            <h4> ` + prod.currency + ` ` + prod.cost +`</h4>  
                        </div>
                    </div>
                        
                    <div class="card-footer">
                        <small class="text-muted d-flex justify-content-end">` + prod.soldCount + ` vendidos</small>
                    </div>
                </a>
            </div>
            `;
        
        };
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
        
    };
};

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = filterPriceList(currentSortCriteria, currentProductsArray);

    //Muestro los productos ordenados
    showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_BY_SOLD_COUNT, resultObj.data);
        }
        
    });
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_SOLD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterPrice").addEventListener("click", function(){
        minPrice = document.getElementById("rangeFilterPriceMin").value;
        maxPrice = document.getElementById("rangeFilterPriceMax").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
            minPrice = parseInt(minPrice);
        }
        else{
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
            maxPrice = parseInt(maxPrice);
        }
        else{
            maxPrice = undefined;
        }

        showProductsList(); 
     }); 
});