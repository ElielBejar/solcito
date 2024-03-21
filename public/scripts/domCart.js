const ul_selected_products = document.getElementById("list_products_selected");


sendReq("/cart/get", {
    method: "GET",
    headers: { "Content-Type": "application/json" }
}).then(data => {
    showCart(data);
});

function deleteProduct(index) {
    sendReq(`/cart/${index}`, {
        method: "DELETE",
    }).then(data => {
        console.log(data);
    });
    li_product = document.getElementsByClassName("product_on_list")[index];
    ul_selected_products.removeChild(li_product);
}

function checkIncreaseStock(input_quantity, product, index) {
    const text_quantity = input_quantity.value;
    let number_quantity = parseInt(text_quantity);
    number_quantity++;
    sendReq(`/stock/${product.code_article}/${product.print}/${product.size}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }).then(data => {
        if (number_quantity <= data[0].quantity) {
            input_quantity.value = `${number_quantity}`;
        } else {
            if (data[0].quantity == 0) {
                deleteProduct(index);
            } else {
                input_quantity.value = `${data[0].quantity}`;
            }
        }
    });
}

function checkDecreaseStock(input_quantity, product, index) {
    const text_quantity = input_quantity.value;
    let number_quantity = parseInt(text_quantity);
    number_quantity--;
    sendReq(`/stock/${product.code_article}/${product.print}/${product.size}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }).then(data => {
        if (number_quantity > 0) {
            if (number_quantity <= data[0].quantity) {
                input_quantity.value = `${number_quantity}`;
            } else {
                if (data[0].quantity == 0) {
                    deleteProduct(index);
                } else {
                    input_quantity.value = `${data[0].quantity}`;
                }
            }
        }
    });
}

function showCart(data) {

    while (ul_selected_products.firstChild) {
        ul_selected_products.removeChild(ul_selected_products.firstChild);
    }

    for (let i = 0; i < data.length; i++) {
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
        const input_quantity = document.createElement("input");
        const bttn_increment_quantity = document.createElement("input");
        const bttn_decrement_quantity = document.createElement("input");

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
        input_quantity.type = "text";
        input_quantity.id = "input_quantity";
        input_quantity.value = "0";
        input_quantity.readOnly = "true";
        bttn_increment_quantity.type = "button";
        bttn_increment_quantity.value = "+";
        bttn_decrement_quantity.type = "button";
        bttn_decrement_quantity.value = "-";

        button_delete.addEventListener("click", function () { deleteProduct(i) });

        checkIncreaseStock(input_quantity, data[i], i);
        bttn_increment_quantity.addEventListener("click", function () {
            checkIncreaseStock(input_quantity, data[i], i);
        });

        bttn_decrement_quantity.addEventListener("click", function () {
            checkDecreaseStock(input_quantity, data[i], i);
        });

        div_img.appendChild(img);
        div_info.appendChild(div_info_product);
        div_info_product.appendChild(span_name);
        div_info_product.appendChild(b_size);
        div_info_product.appendChild(span_price);
        b_size.appendChild(span_size);
        div_info.appendChild(div_tools);
        div_tools.appendChild(button_delete);
        div_tools.appendChild(bttn_increment_quantity);
        div_tools.appendChild(input_quantity);
        div_tools.appendChild(bttn_decrement_quantity);

        li.classList.add("product_on_list");
        li.appendChild(div_img);
        li.appendChild(div_info);

        ul_selected_products.appendChild(li);
    }

}