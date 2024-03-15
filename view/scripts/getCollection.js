// Obtener los parámetros de la URL
const urlParams = new URLSearchParams(window.location.search);

// Obtener el valor del parámetro 'id'
const collection_code = urlParams.get('collection');
sendReq(`/products/collection/${collection_code}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
}).then(data => {
    const name_label = document.getElementById("name_collection");
    //si hay al menos un producto mostralos, sino tira error:
    if(data.length > 0){
    name_label.textContent = "Colección: " + data[0].colection_code;
    showProducts(data);
    }
});
