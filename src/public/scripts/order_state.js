// Obtener los parámetros de la URL
const urlParams = new URLSearchParams(window.location.search);

// Obtener el valor del parámetro 'id'
const state_param = urlParams.get('state');

const h1_state = document.getElementById("title_state");
const p_state = document.getElementById("p_state");

let state;
let text_state;

switch(state_param){
    case "success":state = "Exitoso"; 
                   text_state = "En breve le llegará la confirmación por email";
                   break;
    case "failure":state = "Fallido"; 
                   text_state = "Hubo un problema con el pago del pedido";
                   break;
    case "pending":state = "Pendiente"; 
                   text_state = "El pago está pendiente, se confirmará el pedido cuando esté el pago realizado";
                   break;
}

h1_state.textContent = `El pago del pedido esta en estado ${state}`;
p_state.textContent = `${text_state}`;
