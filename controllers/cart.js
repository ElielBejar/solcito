export class cartController{

    static async defineCart(req, res){
        if(!req.session.cart){
            req.session.cart = [];
            console.log(req.session.cart);
            res.status(200).json({message: "cart defined succefully"});
        }  
    }

    static async addProduct(req, res){

        //res.status(200).json({message:"Agregado correctamente"});
        console.log(req.session.cart);
    }
}