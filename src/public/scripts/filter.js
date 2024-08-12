let order = "cheap";
let groups = [];
let page = 0;

const orderSelection = document.getElementById("order_by").addEventListener("change", setOrder);
const checkboxes = document.querySelectorAll("input[type=checkbox]");

filter();

//va cargando mas productos mientras mas scroll se hace
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      filter();
    }
  });

checkboxes.forEach(checkbox => checkbox.addEventListener("change", setGroups));

function setOrder() {
    page = 0;
    order = this.value;
    removeProducts();
    filter();
}

function setGroups() {
    page = 0;
    if (this.checked) {
        groups.push(this.name);
    } else {
        groups.splice(groups.indexOf(this.name), 1);
    }
    removeProducts();
    filter();
}
//determina las rutas y la especificacion de la request dependiendo 
//de como se usa el filtro
function setRoute(){
   if(groups.length === 0){
      route = `/products/order/${order}/${page}`;
      conf = {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    };
   }else{
      route = "/products/filter/";
      conf = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order, groups, page })
    };
   }
}

function filter(){
    setRoute();
    sendReq(route, conf).then(data=>{
        showProducts(data);
        page++;
    });
}






