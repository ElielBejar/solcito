const shippingOptions = document.getElementsByName("shipping");
const info_transport = document.getElementById("info_transport");
const info_contact = document.getElementById("info_contact");
const direction = document.getElementById("direction");
const fields_shipping = info_transport.querySelectorAll("input");
const fields_contact = info_contact.querySelectorAll("input");
let notransport = true;


direction.value = "Retira en local";

function infoShippingForm(){
    return {
    name:fields_contact[0].value,
    phone:fields_contact[1].value,
    email:fields_contact[2].value,
    transport:fields_shipping[0].value,
    direction:fields_shipping[1].value,
    localidad:fields_shipping[2].value,
    provincia:fields_shipping[3].value,
    codigo_postal:fields_shipping[4].value,
    cuit_dni:fields_shipping[5].value
    }
}

shippingOptions.forEach(function (option) {
    option.addEventListener("change", function () {
        fields_shipping[0].value = "";
        direction.value = "";
        switch (option.value) {
            case "factory":
                info_transport.style.display = "none";
                notransport = true;
                direction.readOnly = true;
                direction.value = "Retira en local";
                break;
            case "viacargo":
                info_transport.style.display = "block";
                direction.readOnly = true;
                direction.value = "Retira en terminal mas cercana";
                fields_shipping[0].readOnly = true;
                fields_shipping[0].value = "ViaCargo";
                notransport = false;
                break;
            case "transport":
                info_transport.style.display = "block";
                direction.readOnly = false;
                direction.value = "";
                notransport = false;
                break;
            default: console.error("Ocurrió un problema");
                break;
        }
    });
});

function requeiredShippingFields() {
    let empties = 0;
    fields_contact.forEach(function (input) {
        if (input.value == "") {
            const message_required = document.createElement("span");
                message_required.textContent = "campo requerido";
                message_required.classList.add("message_required");
                input.insertAdjacentElement("afterend", message_required);
                setTimeout(function () {
                    message_required.remove();
                }, 10000);
            empties++;
        }
    });
    if (notransport == false) {
        fields_shipping.forEach(function (input) {
            if (input.value == "") {
                const message_required = document.createElement("span");
                message_required.textContent = "campo requerido";
                message_required.classList.add("message_required");
                input.insertAdjacentElement("afterend", message_required);
                setTimeout(function () {
                    message_required.remove();
                }, 10000);
                empties++;
            }
        });
    }
    return empties;
}