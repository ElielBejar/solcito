const img_selected_product = document.getElementById("img_selected_product");
const name_selected_product = document.getElementById("name_selected_product");
const price_selected_product = document.getElementById("price_selected_product");
const designs_product = document.getElementById("designs_product");
const sizes_list = document.getElementById("sizes_list");
const btn_add_cart = document.getElementById("btn_add_cart");

//let size_selected = "";
let is_size_selected = false;

function showProduct(data) {
    name_selected_product.textContent = data[0].name;
    price_selected_product.textContent = "$" + data[0].price;
    img_selected_product.src = data[0].img;
    img_selected_product.alt = data[0].name;
}

function showDesigns(data) {

    for (let i = 0; i < data.length; i++) {
        const link_design = document.createElement("a");
        const img_design = document.createElement("img");

        link_design.href = `./product.html?code=${data[i].code}&print_code=${data[i].print_code}`;
        img_design.src = data[i].img;
        img_design.alt = data[i].name;

        designs_product.appendChild(link_design);
        link_design.appendChild(img_design);
    }
}

//deselecciona un talle ya seleccionado
function unselectSize() {
    const unselect_size = document.querySelector(".size_selected");
    if (unselect_size != null) {
        replaceClass(unselect_size, "onstock", "size_selected");
    }
}

//retorna el talle seleccionado
function selectedSize(){
   return document.querySelector(".size_selected");
}

//cuando damos click a un talle
function sizeEvent(element_selected) {
    unselectSize();//si ya habia un talle seleccionado lo deselecciona
    replaceClass(element_selected, "size_selected", "onstock");
    //size_selected = element_selected.textContent;
    if (!is_size_selected) {
        is_size_selected = true;
        if(btn_add_cart.classList.contains("btn_added_cart")){
            replaceClass(btn_add_cart, "btn_yes_stock", "btn_added_cart");
            btn_add_cart.value = "Agregar al carrito";
        }
        setAddCart();
    }
}

//los talles se muestran segun esten disponibles o no:
function checkSize(li, data) {
    if (data.quantity > 0) {
        li.classList.add("onstock");
        li.addEventListener("click", function () { sizeEvent(this) });
    } else {
        li.classList.add("offstock");
    }
}



//muestra los talles:
function showSizes(data) {
    for (let i = 0; i < data.length; i++) {
        const li_size = document.createElement("li");
        checkSize(li_size, data[i]);
        li_size.textContent = data[i].size;
        sizes_list.appendChild(li_size);
    }
    const options = document.querySelectorAll(".offstock");
    if (options.length == data.length) {
        btn_add_cart.value = "Sin stock";
    }
    //setAddCart();
}

function infoProduct(){
    return {
        code_article:code,
        img:img_selected_product.src,
        name:name_selected_product.textContent,
        print:print_param,
        size:selectedSize().textContent,
        price:price_selected_product.textContent
    }
}

//agrega evento al boton de agregar al carrito
//si hay stock, sino no agrega nada
function setAddCart() {
    replaceClass(btn_add_cart, "btn_yes_stock", "btn_no_stock");
    btn_add_cart.addEventListener("click", addCart);
}

//funcion auxiliar para remplazar una clase por otra
function replaceClass(element, new_class, old_class) {
    element.classList.add(new_class);
    element.classList.remove(old_class);
}

//función que responde al evento de agregar al carrito
function addCart() {
    sendReq("/cart/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(infoProduct())
    }).then(data => {
        replaceClass(btn_add_cart, "btn_added_cart", "btn_yes_stock");
        //btn_add_cart.style.backgroundColor = "#085801";
        btn_add_cart.value = data.message;
        //btn_add_cart.style.cursor = "auto";
        is_size_selected = false;
        btn_add_cart.removeEventListener("click", addCart);
    }).catch(error => {
        console.error("Error en la respuesta: ", error);
    });
}

//muestran otros productos de la misma coleccion en el aside:
function showOtherProducts(data) {
    showProducts(data);
}