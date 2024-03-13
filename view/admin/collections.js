const tbody_element = document.getElementById("tbody_collections");

const button_create = document.getElementById("button_create");
const input_new_code = document.getElementById("collection_code");
const input_new_name = document.getElementById("name_collection");
const input_new_img = document.getElementById("img_collection");

function infoForm() {
    return {
        code: input_new_code.value,
        name: input_new_name.value,
        img:`http://127.0.0.1:5501/view/img/${input_new_img.files[0].name}`
    }
}

//evento del boton para mandar un post y agregar una nueva coleccion
button_create.addEventListener("click", function () {
    sendReq("/collections/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(infoForm())
    }).then(data => {
        console.log(data);
    });
});

//muestra en la tabla los datos
function showCollections(data) {
    for (let i = 0; i < data.length; i++) {
        const tr = document.createElement("tr");
        const td_code = document.createElement("td");
        const td_name = document.createElement("td");
        const td_img = document.createElement("td");
        const td_button = document.createElement("td");

        const input_code = document.createElement("input");
        const input_name = document.createElement("input");
        const input_img = document.createElement("img");
        const input_button = document.createElement("input");

        input_code.type = "text";
        input_code.value = data[i].colection_code;
        input_name.type = "text";
        input_name.value = data[i].name;
        input_img.src = data[i].img;
        input_button.type = "button";
        input_button.value = "Borrar";

        td_code.appendChild(input_code);
        td_name.appendChild(input_name);
        td_img.appendChild(input_img);
        td_button.appendChild(input_button);

        tr.appendChild(td_code);
        tr.appendChild(td_name);
        tr.appendChild(td_img);
        tr.appendChild(td_button);

        tbody_element.appendChild(tr);
    }


}