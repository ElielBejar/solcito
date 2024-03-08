const img_selected_product = document.getElementById("img_selected_product");
const name_selected_product = document.getElementById("name_selected_product");
const price_selected_product = document.getElementById("price_selected_product");
const designs_product = document.getElementById("designs_product");

function showProduct(data){
    name_selected_product.textContent = data[0].name;
    price_selected_product.textContent = "$"+data[0].price;
    img_selected_product.src = data[0].img;
    img_selected_product.alt = data[0].name;
}

function showDesigns(data){

    for(let i = 0; i<data.length; i++){
        const link_design = document.createElement("a");
        const img_design = document.createElement("img");

        link_design.href = `http://127.0.0.1:5501/view/nav/product.html?code=${data[i].code}&print_code=${data[i].print_code}`;
        img_design.src = data[i].img;
        img_design.alt = data[i].name;

        designs_product.appendChild(link_design);
        link_design.appendChild(img_design);
    }
}