// Obtener los parámetros de la URL
const urlParams = new URLSearchParams(window.location.search);
        
// Obtener el valor del parámetro 'id'
const code = urlParams.get('code');
console.log(code);
sendReq(`/products/product/${code}`, {
    method:"GET",
    headers:{"Content-Type": "application/json"},
}).then(data => {
    showProduct(data);
});