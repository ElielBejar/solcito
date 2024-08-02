//agarramos los elementos del forms:
const input_name = document.getElementById("name_form");
const input_email = document.getElementById("email_form");
const input_tel = document.getElementById("tel_form");
const input_message = document.getElementById("message_form");

//el contenido del email:
const subject = "Un mensaje nuevo desde SolcitoWeb";

function sendContactEmail(){
    const html = `<h1>De ${input_name.value}</h1><h2>Email: ${input_email.value}</h2>
              <h3>Telefono: ${input_tel.value}</h3><p>${input_message.value}</p>`;
    
    sendEmail(null, subject, html);
}

//encontramos el boton y le agregamos el evento:
const input_button = document.getElementById("send_form");
input_button.addEventListener("click", function(){
    sendContactEmail();
});