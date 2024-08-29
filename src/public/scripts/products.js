const tbody_products = document.getElementById("tbody_products");
const input_code = document.getElementById("code_product");
const input_name = document.getElementById("name_product");
const input_print = document.getElementById("print_product");
const input_img = document.getElementById("img_product");
const input_price = document.getElementById("price_product");
const input_group = document.getElementById("group_product");
const button_create = document.getElementById("button_create");


sendReq("/admin/session", {
   method: "GET",
   headers: { "Content-Type": "application/json" }
}).then(data => {
   if (data.login == "false") {
      document.location.href = "../admin";
   }
});

function infoForm() {

   let new_image;
    if (input_img.files[0] == undefined) {
        new_image = 'noimage';
    } else {
        new_image = input_img.files[0].name;
    }

   return {
      code: input_code.value,
      name: input_name.value,
      print: input_print.value,
      img: `../uploads/products/${new_image}`,
      price: input_price.value,
      group: input_group.value,
      collection: collection_code
   };
}

button_create.addEventListener("click", async function () {
   try {
       // Enviar la solicitud para crear un producto
       const productData = await sendReq("/products/", {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify(infoForm())
       });

       // Preparar el FormData para la subida de imagen
       if(input_img.files[0] != undefined){
       const formData = new FormData();
       formData.append('img', input_img.files[0]);

       // Enviar la solicitud para subir la imagen
       await sendReq("/uploads/products", {
           method: 'POST',
           body: formData
       });
      }
       // Recargar la página después de que ambas solicitudes se completen
       location.reload();
   } catch (error) {
       console.error('Error:', error);
   }
});

//te devuelve el texto de la categoría según el grupo de un articulo
function group_dictionary(group) {
   let group_text = "";
   switch (group) {
      case 3: group_text = "Recién nacidos"; break;
      case 318: group_text = "De 3 a 18 meses"; break
      case 140: group_text = "De 1 a 4 años varón"; break;
      case 141: group_text = "De 1 a 4 años nena"; break;
      case 4160: group_text = "De 4 a 16 años varón"; break;
      case 4161: group_text = "De 4 a 16 años nena"; break;
      case 1: group_text = "Accesorios"; break;
      default: group_text = "Error";
   }
   return group_text;
}

function showProducts(data) {
   for (let i = 0; i < data.length; i++) {
      const tr = document.createElement("tr");

      const td_code = document.createElement("td");
      const td_name = document.createElement("td");
      const td_print = document.createElement("td");
      const td_img = document.createElement("td");
      const td_price = document.createElement("td");
      const td_group = document.createElement("td");
      const td_delete = document.createElement("td");
      const td_open = document.createElement("td");

      const img_product = document.createElement("img");
      const button_delete = document.createElement("input");
      const link_stock = document.createElement("a");

      td_code.textContent = data[i].code;
      td_name.textContent = data[i].name;
      td_print.textContent = data[i].print_code;
      td_price.textContent = `$${data[i].price}`;
      td_group.textContent = group_dictionary(data[i].group_code);
      td_open.appendChild(link_stock);

      button_delete.type = "button";
      button_delete.value = "Borrar";
      button_delete.addEventListener("click", function () {
         if (confirm("¿Estás seguro que querés borrar este producto?")) {
            let imgName = findFileName(data[i].img);
            deleteProduct(data[i].id, imgName);
         }
      });

      img_product.src = data[i].img;

      link_stock.href = `./stock.html?code=${data[i].code}&print=${data[i].print_code}`;
      link_stock.textContent = "Abrir";

      td_img.appendChild(img_product);
      td_delete.appendChild(button_delete);

      tr.appendChild(td_code);
      tr.appendChild(td_name);
      tr.appendChild(td_print);
      tr.appendChild(td_img);
      tr.appendChild(td_price);
      tr.appendChild(td_group);
      tr.appendChild(td_delete);
      tr.appendChild(td_open);

      tbody_products.appendChild(tr);
   }
}

//esta función la hago para extraer solo el nombre de la imagen de todo el path
function findFileName(path){
   let indexBarra = path.lastIndexOf("/");
   let fileName = path.substring((indexBarra+1), path.length);
   return fileName;
}

function deleteProduct(id, imgName) {
   let type = "products";
   sendReq(`/products/${id}`, {
      method: "DELETE"
   }).then(sendReq(`/uploads/${type}/${imgName}`, {
      method: "DELETE",
   }));
   location.reload();
}


