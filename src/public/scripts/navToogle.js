const toogle = document.getElementById("toogle");
const options = document.getElementById("options");
toogle.addEventListener("click", navToogle);


function navToogle(){
    leftOptions = options.style.left;

    if(leftOptions == ""){
        leftOptions = "-50%";
    }
    if(leftOptions == "-50%"){
        options.style.left = "0";
    }else{
        options.style.left = "-50%";
    }
}