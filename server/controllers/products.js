import { ProductsModule } from "../models/mysql/products.js";

export class ProductsController{

    static async getByOrder(req, res){
        const {order} = req.params;
        console.log(req.params.order + " es el paramtero");
        const products = await ProductsModule.getByOrder(order);
        console.log(products + " hola");
        res.json(products);
    }

    static async getByFilter(req, res){
       const order = req.body.order;
       const groups = req.body.groups;
       const products = await ProductsModule.getByFilter(order, groups);
       console.log(products);
       res.json(products);
    }

    static async createProduct(req, res){
        
    }

    static async updateProduct(req, res){

    }

    static async deleteProduct(req, res){

    }
}