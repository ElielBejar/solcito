const collections = document.getElementById("collections");

function showCollections(data){
   for(let i = 0; i<data.length; i++){
      const collection = document.createElement("div");
      const link_colection = document.createElement("a");
      const img_colection = document.createElement("img");
      const label_colection = document.createElement("label");

      collection.classList.add("colection");
      link_colection.href = `./collection.html?collection=${data[i].colection_code}`;
      img_colection.src = data[i].img;
      img_colection.id = `colection${i}`;
      img_colection.alt = "coleccion";
      label_colection.for = `colection${i}`;
      label_colection.textContent = data[i].name;

      collections.appendChild(collection);
      collection.appendChild(link_colection);
      link_colection.appendChild(img_colection);
      link_colection.appendChild(label_colection);
   }
}