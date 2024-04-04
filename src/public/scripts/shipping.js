const shippingOptions = document.getElementsByName("shipping");
const info_transport = document.getElementById("info_transport");
const info_contact = document.getElementById("info_contact");
const direction = document.getElementById("direction");
const fields_shipping = info_transport.querySelectorAll("input");
const fields_contact = info_contact.querySelectorAll("input");
let notransport = true;

shippingOptions.forEach(function (option) {
    option.addEventListener("change", function () {
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
                empties++;
            }
        });
    }
    return empties;
}