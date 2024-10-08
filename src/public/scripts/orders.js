sendReq("/admin/session", {
    method: "GET",
    headers: { "Content-Type": "application/json" }
}).then(data => {
    if (data.login == "false") {
        document.location.href = "../admin";
    }
});

const orders_table = document.getElementById("orders_table");

function deleteOrder(id) {
    sendReq(`/order/${id}`, {
        method: "DELETE"
    });
    location.reload();
}

function addDeleteButton(tr, data) {
    const td_deleteButton = document.createElement("td");
    const deleteButton = document.createElement("input");
    deleteButton.type = "button";
    deleteButton.value = "Eliminar";

    deleteButton.addEventListener("click", function () {
        if (confirm("¿Estás seguro que querés borrar esta orden?")) {
            deleteOrder(data.id);
        }
    });

    td_deleteButton.appendChild(deleteButton);
    tr.appendChild(td_deleteButton);

}

async function getOrders() {
    try {

        const response_orders = await fetch(`${BASE_ROUTE}/order`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const orders = await response_orders.json();

        showOrders(orders);
    } catch (error) {
        console.log(error);
    }
}

getOrders();

function showOrders(data) {

    for (let i = (data.length - 1); i >= 0; i--) {
        const tr = document.createElement("tr");

        const td_id = document.createElement("td");
        const td_name = document.createElement("td");
        const td_phone = document.createElement("td");
        const td_email = document.createElement("td");
        const td_state = document.createElement("td");
        const td_open = document.createElement("td");

        const a_open = document.createElement("a");
        a_open.textContent = "Ver pedido";
        a_open.href = `${BASE_ROUTE}/admin/order.html?id=${data[i].id}`;


        td_id.textContent = data[i].id;
        td_name.textContent = data[i].name;
        td_phone.textContent = data[i].phone;
        td_email.textContent = data[i].email;
        td_state.textContent = data[i].state;
        if (data[i].state == "Pendiente") {
            td_state.style.backgroundColor = "#E6C701";
        } else if (data[i].state == "Aceptado") {
            td_state.style.backgroundColor = "#00FF36";
        } else {
            td_state.style.backgroundColor = "#BD0909";
        }
        td_open.appendChild(a_open);

        tr.appendChild(td_id);
        tr.appendChild(td_name);
        tr.appendChild(td_phone);
        tr.appendChild(td_email);
        tr.appendChild(td_state);
        tr.appendChild(td_open);

        if (data[i].state != "Pendiente") {
            addDeleteButton(tr, data[i]);
        }

        orders_table.appendChild(tr);
    }
}

