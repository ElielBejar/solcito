const tbody_element = document.getElementById("tbody_collections");

const button_create = document.getElementById("button_create");
const input_new_code = document.getElementById("collection_code");
const input_new_name = document.getElementById("name_collection");
const input_new_img = document.getElementById("img_collection");
const crud_collections = document.getElementById("crud_collections");
const login = document.getElementById("login");
const input_user = document.getElementById("user");
const input_password = document.getElementById("password");
const button_login = document.getElementById("button_login");

isLogged();

//ver si primero está loggeado:
function isLogged() {
    sendReq("/admin/session", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }).then(data => {
        if (data.login == "true") {
            login.style.display = "none";
            crud_collections.style.display = "block";
        }
    });

}
button_login.addEventListener("click", function () {
    const user = input_user.value;
    const password = input_password.value;
    sendReq("/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, password })
    }).then(data => {
        if (data.login == "true") {
            isLogged();
        } else {
            alert("Usuario o contraseña incorrecta");
        }
    });
});

function infoForm() {
    return {
        code: input_new_code.value,
        name: input_new_name.value,
        img: `../uploads/collections/${input_new_img.files[0].name}`
    }
}

//evento del boton para mandar un post y agregar una nueva coleccion
button_create.addEventListener("click", function () {
    location.reload();
    sendReq("/collections/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(infoForm())
    }).then(data => {

        const formData = new FormData();
        formData.append('img', input_new_img.files[0]);

        sendReq("/uploads/collections", {
            method: 'POST',
            body: formData
        })
            .then(response => {
            })
            .catch(error => {
                console.log(error);
            });
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
        const td_link = document.createElement("td");
        const link_collection = document.createElement("a");

        const img_collection = document.createElement("img");
        const btn_delete = document.createElement("input");

        td_code.textContent = data[i].colection_code;
        td_name.textContent = data[i].name;
        img_collection.src = data[i].img;
        btn_delete.type = "button";
        btn_delete.value = "Borrar";
        btn_delete.addEventListener("click", function () { deleteCollection(data[i].colection_code) });
        link_collection.href = `./products.html?collection=${data[i].colection_code}`;
        link_collection.textContent = "Abrir";

        td_img.appendChild(img_collection);
        td_button.appendChild(btn_delete);
        td_link.appendChild(link_collection);


        tr.appendChild(td_code);
        tr.appendChild(td_name);
        tr.appendChild(td_img);
        tr.appendChild(td_button);
        tr.appendChild(td_link);

        tbody_element.appendChild(tr);
    }
}

function deleteCollection(collection_code) {
    sendReq(`/collections/${collection_code}`, {
        method: "DELETE"
    });
    location.reload();  
}