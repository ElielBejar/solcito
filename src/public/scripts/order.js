sendReq("/admin/session", {
    method: "GET",
    headers: { "Content-Type": "application/json" }
 }).then(data => {
    if (data.login == "false") {
        document.location.href = "../admin";
    }
 });

// Obtener los parámetros de la URL
const urlParams = new URLSearchParams(window.location.search);

// Obtener el valor del parámetro 'id'
const id_param = urlParams.get('id');

const shipping_table = document.getElementById("shipping_table");
const order_table = document.getElementById("order_table");
const bttn_accept = document.getElementById("bttn_accept");
const bttn_no_accept = document.getElementById("bttn_no_accept");
const email = "";

const code_products = [];
const print_products = [];
const size_products = [];
const quantities = [];

getOrder(id_param);

bttn_accept.addEventListener("click", function(){
    for(let i = 0; i<code_products.length; i++){
        updateStock(code_products[i], print_products[i], size_products[i], quantities[i]);
    }
    changeState(id_param, 'Aceptado');
    const html_aceptado = "<h1>Gracias por su compra!</h1>" + 
                          "<p>Tu pedido fue aceptado, se lo prepararemos a la brevedad y nos contactaremos con usted</p>";
    sendEmail(email, "Tu pedido fue aceptado!", html_aceptado);
});
bttn_no_accept.addEventListener("click", function(){
    changeState(id_param, 'Rechazado');
    const html_rechazado = "<h1>Tu pedido fue rechazado</h1><p>Parece que hay un problema con los datos que proporcionaste o un problema de stock, " + 
                           "para mas información puede contactarnos al +54 9 11 3026-9534 o puede enviarnos un mail: info@solcitoweb.com.ar</p>";
    sendEmail(email, "Tu pedido fue rechazado", html_rechazado);
});

async function updateStock(code, print, size, quantity){
    const id_response = await fetch(`http://localhost:3000/stock/id/${code}/${print}/${size}`, {
        method:"GET",
        headers: { "Content-Type": "application/json" },
    });
    const quantity_response = await fetch(`http://localhost:3000/stock/${code}/${print}/${size}`, {
        method:"GET",
        headers: { "Content-Type": "application/json" },
    });
    const id_info = await id_response.json();
    const quantity_info = await quantity_response.json();
    const new_quantity = quantity_info[0].quantity - quantity;
    const updateResponse = await fetch(`http://localhost:3000/stock/${id_info[0].id}`, {
        method:"PATCH",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({code:code, print:print, size:size, quantity:new_quantity}),
    });
    update_info = await updateResponse.json();
    console.log(id_info);
}

async function getOrder(id) {
    const shipping_response = await fetch(`http://localhost:3000/order/shipping/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    const shipping_info = await shipping_response.json();

    const order_response = await fetch(`http://localhost:3000/order/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    const order_info = await order_response.json();

    if(shipping_info[0].state == "Aceptado" || shipping_info[0].state == "Rechazado"){
        bttn_accept.style.display = "none";
        bttn_no_accept.style.display = "none";
    }

    showShipping(shipping_info);
    showOrders(order_info);
}

async function changeState(id, state){
    const response = await fetch(`http://localhost:3000/order/status/${id}/${state}`, {
        method:"PATCH",
        headers:{"Content-Type":"application/json"},
    });
    const info_response = await response.json();
    if(info_response.affectedRows = 1){
       location.reload();
    }else{
        alert("No se pudo aceptar el pedido");
    }
}

function showShipping(shipping_info) {
    const tr = document.createElement("tr");

    const td_name = document.createElement("td");
    const td_phone = document.createElement("td");
    const td_email = document.createElement("td");
    const td_direction = document.createElement("td");
    const td_transport = document.createElement("td");
    const td_localidad = document.createElement("td");
    const td_provincia = document.createElement("td");
    const td_codigo_postal = document.createElement("td");
    const td_cuit_dni = document.createElement("td");

    td_name.textContent = shipping_info[0].name;
    td_phone.textContent = shipping_info[0].phone;
    td_email.textContent = shipping_info[0].email;
    email = shipping_info[0].email;
    td_direction.textContent = shipping_info[0].direction;
    td_transport.textContent = shipping_info[0].transport;
    td_localidad.textContent = shipping_info[0].localidad;
    td_provincia.textContent = shipping_info[0].provincia;
    td_codigo_postal.textContent = shipping_info[0].codigo_postal;
    td_cuit_dni.textContent = shipping_info[0].cuit_dni;

    tr.appendChild(td_name);
    tr.appendChild(td_phone);
    tr.appendChild(td_email);
    tr.appendChild(td_direction);
    tr.appendChild(td_transport);
    tr.appendChild(td_localidad);
    tr.appendChild(td_provincia);
    tr.appendChild(td_codigo_postal);
    tr.appendChild(td_cuit_dni);

    shipping_table.appendChild(tr);
}

function showOrders(order_info) {

    for (let i = 0; i < order_info.length; i++) {
        const tr = document.createElement("tr");

        const td_code = document.createElement("td");
        const td_print = document.createElement("td");
        const td_size = document.createElement("td");
        const td_quantity = document.createElement("td");
        const td_price = document.createElement("td");
        const td_img = document.createElement("td");

        td_code.textContent = order_info[i].code;
        td_print.textContent = order_info[i].print;
        td_size.textContent = order_info[i].size;
        td_quantity.textContent = order_info[i].quantity;
        td_price.textContent = order_info[i].price;

        code_products.push(order_info[i].code);
        print_products.push(order_info[i].print);
        size_products.push(order_info[i].size);
        quantities.push(order_info[i].quantity);

        const img = document.createElement("img");
        img.src = order_info[i].img;
        img.alt = "img artículo";
        td_img.appendChild(img);

        tr.appendChild(td_code);
        tr.appendChild(td_print);
        tr.appendChild(td_size);
        tr.appendChild(td_quantity);
        tr.appendChild(td_price);
        tr.appendChild(td_img);

        order_table.appendChild(tr);
    }
}

