// Obtener los parámetros de la URL
const urlParams = new URLSearchParams(window.location.search);

// Obtener el valor del parámetro 'id'
const id_param = urlParams.get('id');

const shipping_table = document.getElementById("shipping_table");
const order_table = document.getElementById("order_table");

getOrder(id_param);

async function getOrder(id){
    const shipping_response = await fetch(`http://localhost:3000/order/shipping/${id}`, {
        method:"GET",
        headers:{"Content-Type": "application/json"},
    });

    const shipping_info = await shipping_response.json();

    const order_response = await fetch(`http://localhost:3000/order/${id}`, {
        method:"GET",
        headers:{"Content-Type": "application/json"},
    });

    const order_info = await order_response.json();

    showShipping(shipping_info);
    showOrders(order_info);
}

function showShipping(shipping_info){
    console.log(shipping_info);
}

function showOrders(order_info){
    console.log(order_info);
}

