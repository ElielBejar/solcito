const shippingOptions = document.getElementsByName("shipping");
const info_transport  = document.getElementById("info_transport");
const direction = document.getElementById("direction");

shippingOptions.forEach(function(option){
    option.addEventListener("change", function(){
        switch(option.value){
            case "factory":
            info_transport.style.display = "none";
            break;
            case "viacargo":
            info_transport.style.display = "block";
            direction.readOnly = true;
            direction.value = "Retira en terminal mas cercana";
            break;
            case "transport":
            info_transport.style.display = "block";
            direction.readOnly = false;
            direction.value = "";
            break;
            default:console.error("Ocurrió un problema");
            break;
        }
    });
});