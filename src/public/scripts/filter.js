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
//determina las rutas y la especificacion de la request dependiendo 
//de como se usa el filtro
function setRoute(){
   if(groups.length === 0){
      route = `/products/${order}`;
      conf = {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    };
   }else{
      route = "/products/filter/";
      conf = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order, groups })
    };
   }
}

function filter(){
    setRoute();
    sendReq(route, conf).then(data=>{
        showProducts(data);
    });
}






