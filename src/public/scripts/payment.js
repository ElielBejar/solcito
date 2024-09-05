const button_buy = document.getElementById("button_buy");

let mp;
let access_token_sp;//access token de si pago

async function getPublicKey() {
    const response = await fetch(`${BASE_ROUTE}/payment/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    
    const data = await response.json();
    const publicKey = data.publicKey;
    mp = new MercadoPago(publicKey, {
        locale: 'es-AR'
    });
}

//getPublicKey();
getAccessTokenSiPago();


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

function infoCheckoutSP() {
    const inputs_quantities = document.querySelectorAll(".input_quantity");
    const quantities = Array.from(inputs_quantities).map(function (input) { return input.value });

    return {
        quantities: quantities,
        access_token:access_token_sp
    };
}

function infoOrder(id_order) {
    const inputs_quantities = document.querySelectorAll(".input_quantity");
    const quantities = Array.from(inputs_quantities).map(function (input) { return input.value });
    return {
        id_order: id_order,
        quantities: quantities,
    };
}

async function checkout() {
    const min_amount_response = await fetch(`${BASE_ROUTE}/minamount`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    const min_amount_json = await min_amount_response.json();
    const min_amount = min_amount_json.minAmount;
    if (getFloatPrice(span_total_cart_price.textContent) < min_amount) {
        button_buy.style.backgroundColor = "#cb3234";
        button_buy.value = `Monto menor a ${min_amount}`;
        setTimeout(function () {
            button_buy.style.backgroundColor = "#520000";
            button_buy.value = "Comprar";
        }, 2000);
    } else {
        try {
            if (requeiredShippingFields() == 0) {
                generateTryPaymentSP();
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

//manda el fetch a la api de sipago para tener el acces token

function getAccessTokenSiPago(){

    fetch(`${BASE_ROUTE}/payment/sipago/credentials`, {
        method: "GET",
        headers: { "Content-Type": "application/json",
    }}).then(response => response.json())
       .then(credentials => {
        const url = 'https://auth.preprod.geopagos.com/oauth/token';//development
        const data = {
          grant_type: "client_credentials",
          client_id: `${credentials.client_id}`,
          client_secret: `${credentials.client_secret}`,
          scope: "*"
        };
        
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
          access_token_sp = data.access_token;
        })
        .catch(error => {
          console.error('Error:', error);
        });
       });
}


async function createOrder(){
    const shipping_response = await fetch(`${BASE_ROUTE}/order/shipping`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(infoShippingForm()),
    });
    const res_id = await shipping_response.json();
    const response_order = await fetch(`${BASE_ROUTE}/order/order`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(infoOrder(res_id.order_id)),
    });
    const res_order = await response_order.json();
}

async function generateTryPaymentMP(){
    const response = await fetch(`${BASE_ROUTE}/payment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(infoCheckout()),
    });
    const shipping_response = await fetch(`${BASE_ROUTE}/order/shipping`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(infoShippingForm()),
    });
    const res_id = await shipping_response.json();
    const response_order = await fetch(`${BASE_ROUTE}/order/order`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(infoOrder(res_id.order_id)),
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

async function generateTryPaymentSP(){
    await createOrder();
    fetch(`${BASE_ROUTE}/payment/sipago`, 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(infoCheckoutSP())
    }).then(response => response.json())
      .then(order => {
        window.location.href = order.data.links[0].checkout
    });
}