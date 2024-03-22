// Obtener los parámetros de la URL
const urlParams = new URLSearchParams(window.location.search);
        
// Obtener el valor del parámetro 'code' y 'print_code'
const code = urlParams.get('code');
const print_param = urlParams.get('print_code');

//muestra el producto y obtiene los productos de esa coleccion
//para mostrar mas abajo
sendReq(`/products/product/${code}/${print_param}`, {
    method:"GET",
    headers:{"Content-Type": "application/json"},
}).then(data => {
    showProduct(data);
    getProductsFromCollection(data[0].colection_code);
});

//muestra los disenios del producto
sendReq(`/products/product/${code}`, {
    method:"GET",
    headers:{"Content-Type": "application/json"},
}).then(data => {
    showDesigns(data);
});

//muestra los talles disponibles para ese articulo y estampa
sendReq(`/stock/sizes/${code}/${print_param}`, {
    method:"GET",
    headers:{"Content-Type": "application/json"},
}).then(data => {
    showSizes(data);
});

function getProductsFromCollection(collection_code){

    sendReq(`/products/collection/${collection_code}`, {
        method:"GET",
        headers:{"Content-Type": "application/json"},
    }).then(data => {
        showOtherProducts(data);
    });
}