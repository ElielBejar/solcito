// Obtener los parámetros de la URL
const urlParams = new URLSearchParams(window.location.search);
        
// Obtener el valor del parámetro 'id'
const code = urlParams.get('code');
const print_param = urlParams.get('print_code');
sendReq(`/products/product/${code}/${print_param}`, {
    method:"GET",
    headers:{"Content-Type": "application/json"},
}).then(data => {
    showProduct(data);
    getProductsFromCollection(data[0].colection_code);
});

sendReq(`/products/product/${code}`, {
    method:"GET",
    headers:{"Content-Type": "application/json"},
}).then(data => {
    showDesigns(data);
});

function getProductsFromCollection(collection_code){

    sendReq(`/products/collection/${collection_code}`, {
        method:"GET",
        headers:{"Content-Type": "application/json"},
    }).then(data => {
        showOtherProducts(data);
    });
}