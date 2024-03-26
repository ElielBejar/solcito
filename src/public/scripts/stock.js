sendReq("/admin/session", {
    method: "GET",
    headers: { "Content-Type": "application/json" }
 }).then(data => {
    if (data.login == "false") {
        document.location.href = "../admin";
    }
 });

const tbody_stock = document.getElementById("tbody_stock");
const h1_title = document.getElementsByTagName("h1").item(0);
const img_article = document.getElementById("img_art");
const input_form_size = document.getElementById("size");
const input_form_quantity = document.getElementById("quantity");
const button_send = document.getElementById("send_button");
// Obtener los parámetros de la URL
const urlParams = new URLSearchParams(window.location.search);
        
// Obtener el valor del parámetro 'code' y 'print_code'
const code_param = urlParams.get('code');
const print_param = urlParams.get('print');

function infoForm(size_param, quantity_param){
    return {
       code:code_param,
       print:print_param,
       size:size_param,
       quantity:quantity_param
    };
}

button_send.addEventListener("click", function(){
    sendReq("/stock/", {
         method:"POST",
         headers:{"Content-Type":"application/json"},
         body:JSON.stringify(infoForm(input_form_size.value, input_form_quantity.value))
    });
    location.reload();
});

function getInfo(code, print){
    sendReq(`/products/product/${code}/${print}`, {
        method:"GET",
        header:{"Content-Type":"application/json"},
    }).then(data => {
        h1_title.textContent = "Artículo: " + data[0].code + " - " + data[0].print_code;
        img_article.src = data[0].img;
        img_article.alt = data[0].code; 
    });
}

getInfo(code_param, print_param);

sendReq(`/stock/sizes/${code_param}/${print_param}`, {
    method:"GET",
    header:{"Content-Type":"application/json"}
}).then(data => {
    showStock(data);
})


function showStock(data){
    for(let i = 0; i<data.length; i++){
       const tr = document.createElement("tr");
       const td_size = document.createElement("td");
       const td_quantity = document.createElement("td");
       const td_delete = document.createElement("td");
       const td_update = document.createElement("td");


       const button_delete = document.createElement("input");
       button_delete.value = "Borrar";
       button_delete.type = "button";
       console.log(data[i].id);
       button_delete.addEventListener("click", function(){
            sendReq(`/stock/${data[i].id}`, {
                method:"DELETE"
            });
            location.reload();
       });

       const input_quantity = document.createElement("input");
       input_quantity.type = "text";
       input_quantity.value = data[i].quantity;

       td_size.textContent = data[i].size;

       td_quantity.appendChild(input_quantity);
       tr.appendChild(td_size);
       tr.appendChild(td_quantity);

       const button_update = document.createElement("input");
       button_update.value = "Guardar";
       button_update.type = "button";
       button_update.addEventListener("click", function(){
           sendReq(`/stock/${data[i].id}`, {
               method:"PATCH",
               headers:{"Content-type":"application/json"},
               body:JSON.stringify(infoForm(data[i].size, input_quantity.value))
           });
       });

       td_delete.appendChild(button_delete);
       tr.appendChild(td_delete);

       td_update.appendChild(button_update);
       tr.appendChild(td_update);

       tbody_stock.appendChild(tr);
    }
}