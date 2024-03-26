const ul_selected_products = document.getElementById("list_products_selected");
const span_total_cart_price = document.getElementById("total_cart_price");
const button_buy = document.getElementById("button_buy");
const cart_prices = [];


function checkEmptyCart(data) {
    if (data.length == 0) {
        ul_selected_products.textContent = "Aún no hay nada en el carrito";
        button_buy.style.display = "none";
        return true;
    } else {
        return false;
    }
}



sendReq("/cart/get", {
    method: "GET",
    headers: { "Content-Type": "application/json" }
}).then(data => {
    if (!checkEmptyCart(data)) {
        showCart(data);
    }
});

function deleteProduct(li, index) {
    sendReq(`/cart/${index}`, {
        method: "DELETE",
    }).then(data => {
        ul_selected_products.removeChild(li);
        cart_prices.splice(index, 1);
        if (ul_selected_products.childNodes.length == 0) {
            ul_selected_products.textContent = "Aún no hay nada en el carrito";
            button_buy.style.display = "none";
        }
    });
}

//devuelve el numero float del precio sin el '$'
function getFloatPrice(string_price) {
    return parseFloat(string_price.slice(1, string_price.length));
}

// retorna un float con el precio total en función de la cantidad
function updatePrice(price, quantity) {
    let float_price = getFloatPrice(price);
    return float_price * quantity;
}

function updateTotalCartPrice(index, price, quantity) {
    cart_prices[index] = updatePrice(price, quantity);
    const total_cart = cart_prices.reduce((total, element) => total + element, 0);
    span_total_cart_price.textContent = `$${total_cart}`;
}

function checkIncreaseStock(input_quantity, product, index) {
    return new Promise((resolve, reject) => {
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
            resolve();
        });
    });
}

function checkDecreaseStock(input_quantity, product, index) {
    return new Promise((resolve, reject) => {
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
            resolve();
        });
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

        button_delete.addEventListener("click", function () {
            deleteProduct(li, i);
            span_total_cart_price.textContent = `$${cart_prices.reduce((total, element) => total + element, 0)}`;
        });

        checkIncreaseStock(input_quantity, data[i], i);
        bttn_increment_quantity.addEventListener("click", function () {
            checkIncreaseStock(input_quantity, data[i], i).then(() => {
                span_price.textContent = `$${updatePrice(data[i].price, input_quantity.value)}`;
                updateTotalCartPrice(i, data[i].price, input_quantity.value);
            });
            //
        });

        bttn_decrement_quantity.addEventListener("click", function () {
            checkDecreaseStock(input_quantity, data[i], i).then(() => {
                span_price.textContent = `$${updatePrice(data[i].price, input_quantity.value)}`;
                updateTotalCartPrice(i, data[i].price, input_quantity.value);
            });
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
        cart_prices.push(getFloatPrice(data[i].price));
    }
    //muestra el total del carrito sin contar el envío
    span_total_cart_price.textContent = `$${cart_prices.reduce((total, element) => total + element, 0)}`;

}