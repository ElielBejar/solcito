const ul_selected_products = document.getElementById("list_products_selected");


sendReq("/cart/get", {
   method:"GET",
   headers:{"Content-Type":"application/json"}
}).then(data => {
    showCart(data);
});

function showCart(data){
    for(let i = 0; i<data.length; i++){
        const li = document.createElement("li");
        const div_img = document.createElement("div");
        const img = document.createElement("img");
        const div_info = document.createElement("div");
        const div_info_product = document.createElement("div");
        const span_name = document.createElement("span");
        const b_size = document.createElement("b");
        const span_size = document.createElement("span");
        const span_price = document.createElement("span");
        const div_tools = document.createElement("div");
        const button_delete = document.createElement("input");
        const label_quantity = document.createElement("label");
        const input_quantity = document.createElement("input");

        div_img.classList.add("img_container");
        img.src = data[i].img;
        img.alt = data[i].name;
        div_info.classList.add("info_container");
        div_info_product.classList.add("info_product");
        span_name.textContent = data[i].name;
        span_size.textContent = data[i].size;
        span_price.textContent = data[i].price;
        div_tools.classList.add("product_tools");
        button_delete.type = "button";
        button_delete.value = "Quitar";
        label_quantity.for = "input_quantity";
        label_quantity.textContent = "Cantidad: ";
        input_quantity.type = "text";
        input_quantity.id = "input_quantity";
        input_quantity.value = "1";

        div_img.appendChild(img);
        div_info.appendChild(div_info_product);
        div_info_product.appendChild(span_name);
        div_info_product.appendChild(b_size);
        div_info_product.appendChild(span_price);
        b_size.appendChild(span_size);
        div_info.appendChild(div_tools);
        div_tools.appendChild(button_delete);
        div_tools.appendChild(label_quantity);
        div_tools.appendChild(input_quantity);

        li.classList.add("product_on_list");
        li.appendChild(div_img);
        li.appendChild(div_info);

        ul_selected_products.appendChild(li);
    }

}