const img_selected_product = document.getElementById("img_selected_product");
const name_selected_product = document.getElementById("name_selected_product");
const price_selected_product = document.getElementById("price_selected_product");

function showProduct(data){
    name_selected_product.textContent = data[0].name;
    price_selected_product.textContent = "$"+data[0].price;
    img_selected_product.src = data[0].img;
    img_selected_product.alt = data[0].name;
}