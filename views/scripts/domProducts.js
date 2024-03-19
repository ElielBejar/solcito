const products_container = document.getElementById("products_container");

// Eliminar todos los nodos hijos
function removeProducts() {
   while (products_container.firstChild) {
      products_container.removeChild(products_container.firstChild);
   }
}


function showProducts(data) {
   removeProducts();
   for (let i = 0; i < data.length; i++) {
      const product = document.createElement("div");
   const link_product = document.createElement("a");
   const img_product = document.createElement("div");
   const img = document.createElement("img");
   const info_product = document.createElement("div");
   const name = document.createElement("p");
   const price = document.createElement("span");

   product.classList.add("product");
   link_product.href = `http://127.0.0.1:5501/views/nav/product.html?code=${data[i].code}&print_code=${data[i].print_code}`;
   img_product.classList.add("img_product");
   img.src = `${data[i].img}`;
   info_product.classList.add("info_product");
   name.classList.add("description");
   name.textContent = `${data[i].name}`;
   price.classList.add("price");
   price.textContent = `$${data[i].price}`;



   products_container.appendChild(product);
   product.appendChild(link_product);
   link_product.appendChild(img_product);
   img_product.appendChild(img);

   link_product.appendChild(info_product);
   info_product.appendChild(name);
   info_product.appendChild(price);
   }
}