function isProductAlreadySelected(cart, product){
    const product_found = cart.find(function(p){
         return p.name == product.name && 
                p.print == product.print &&
                p.size == product.size;
    });

    const result = product_found ? true : false;
    return result;
}

export class cartController{

    static async defineCart(req, res){
        if(!req.session.cart){
            req.session.cart = [];
            res.status(200).json({message: "cart defined succefully"});
        }  
    }

    static async addProduct(req, res){
        if(isProductAlreadySelected(req.session.cart, req.body)){
            console.log("si");
            res.status(200).json({message:"Ya está en el carrito"});
        }else{
        req.session.cart.push(req.body);
        console.log(req.session.cart);
        res.status(200).json({message:"Agregado al carrito"});
        }
    }

    static async getCart(req, res){
        res.json(req.session.cart);
    }
}