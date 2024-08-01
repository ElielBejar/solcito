const button_buy = document.getElementById("button_buy");

const mp = new MercadoPago('APP_USR-9c12d82f-25b2-4245-806c-68bdad2c6a3e', {
    locale: 'es-AR'
});


button_buy.addEventListener("click", function () {
    checkout();
    /*html_email = "<h1>Tu pedido está pendiente de aprobación</h1>" + 
                 "<p>Revisaremos sus datos proporcionados, le avisaremos a la brevedad la confirmación del pedido," +
                 " para mas información puede contactarse al: +54 9 11 3026-9534 o enviarnos un mail al: info@solcitoweb.com.ar</p>";
    sendEmail(fields_contact[2].value, "Tu pedido está pendiente de aprobación", html_email);*/
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
                const preference = await response.json();

                mp.bricks().create("wallet", "wallet_container", {
                    initialization: {
                        preferenceId: preference.id,
                    },
                  });
                
                sendEmail(null, "Nuevo Pedido!", "");
                window.location.href = preference.init_point;
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
