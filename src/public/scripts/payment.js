const button_buy = document.getElementById("button_buy");

const mp = new MercadoPago('TEST-5e3fbbc2-3e5d-4ca7-9e92-08a0bd167c9c', {
    locale: 'es-AR'
});


button_buy.addEventListener("click", function () {
    checkout();
});



function infoCheckout() {
    const inputs_quantities = document.querySelectorAll(".input_quantity");
    const quantities = Array.from(inputs_quantities).map(function (input) { return input.value });
    //const inputs_shipping = document.querySelectorAll(".input_shipping");
    //const shipping = Array.from(inputs_shipping).map(function(input){return input.value});
    return {
        //total: getFloatPrice(span_total_cart_price.textContent),
        quantities: quantities,
        //shipping:shipping

    };
}

function infoOrder(id_order){
    const inputs_quantities = document.querySelectorAll(".input_quantity");
    const quantities = Array.from(inputs_quantities).map(function (input) { return input.value });
    return {
        id_order:id_order,
        quantities: quantities,
    };
}

async function checkout() {
    if (getFloatPrice(span_total_cart_price.textContent) < 30000) {
        button_buy.style.backgroundColor = "#cb3234";
        button_buy.value = "Monto menor a 30000";
        setTimeout(function () {
            button_buy.style.backgroundColor = "#520000";
            button_buy.value = "Comprar";
        }, 2000);
    } else {
        try {
            if (requeiredShippingFields() == 0) {
                const response = await fetch("http://localhost:3000/payment", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(infoCheckout()),
                });
                const shipping_response = await fetch("http://localhost:3000/order/shipping", {
                   method:"POST",
                   headers:{
                       "Content-Type":"application/json",
                   },
                   body:JSON.stringify(infoShippingForm()),
                });
                const res_id = await shipping_response.json();
                console.log(res_id.order_id);
                const response_order = await fetch("http://localhost:3000/order/order",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body:JSON.stringify(infoOrder(res_id.order_id)),
                });
                const res_order = await response_order.json();
                console.log(res_order);
                const preference = await response.json();
               // window.location.href = preference.init_point;
            }else{
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const createCheckoutButton = (preference_id) => {

    const bricksBuilder = mp.bricks();

    const renderComponent = async function () {
        if (window.checkoutButton) window.checkoutButton.unmount();
        await bricksBuilder.create("wallet", "wallet_container", {
            initialization: {
                preferenceId: preference_id,
            },
        });
    };

    renderComponent();
};
