const text_search = document.getElementById("text_search");
const list_results = document.getElementById("list_results");

text_search.addEventListener("keyup", findResults);

//repitiendo codigo del domProducts
function removeResults(){
    while(list_results.firstChild){
        list_results.removeChild(list_results.firstChild);
    }
}

//reutilizando codigo del domProducts, mejorar despues
function showListResult(data){
    
    removeResults();

    for(let i = 0; i<data.length; i++){
        const li_result = document.createElement("li");
        const a_result = document.createElement("a");
        
        a_result.textContent = data[i].name;
        a_result.href = `http://localhost:3000/nav/product.html?code=${data[i].code}&print_code=${data[i].print_code}`;

        list_results.appendChild(li_result);
        li_result.appendChild(a_result);
    }
}

function findResults(){
    const text = text_search.value;
    if(text != ""){
    sendReq(`/products/search/${text}`, {
        method:"GET",
        headers:{"Content-Type": "application/json"},
    }).then(data => {
        showListResult(data);
    });
   }else{
     removeResults();
   }
}