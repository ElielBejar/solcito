let order = "cheap";
let groups = [];

const orderSelection = document.getElementById("order_by").addEventListener("change", setOrder);
const checkboxes = document.querySelectorAll("input[type=checkbox]");

filter();

checkboxes.forEach(checkbox => checkbox.addEventListener("change", setGroups));

function setOrder() {
    order = this.value;
    filter();
}

function setGroups() {
    if (this.checked) {
        groups.push(this.name);
    } else {
        groups.splice(groups.indexOf(this.name), 1);
    }
    filter();
}

function getRoute() {
    if (groups.length === 0) {
        return `http://localhost:3000/products/${order}`;
    } else {
        return "http://localhost:3000/products/filter/";
    }
}

function getInfoFetch() {
    if (groups.length === 0) {
        return {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        }
    } else {
        return {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ order, groups })
        }
    }
}

function filter() {
    fetch(getRoute(), getInfoFetch()).then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    }).then(data => {
        showProducts(data);
    }).catch(error => {
        console.error("There was a problem with your fetch operation", error);
    });
}






