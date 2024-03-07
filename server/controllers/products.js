import { ProductsModule } from "../models/mysql/products.js";

export class ProductsController{

    static async getByOrder(req, res){
        const {order} = req.params;
        const products = await ProductsModule.getByOrder(order);
        res.json(products);
    }

    static async getByFilter(req, res){
       const order = req.body.order;
       const groups = req.body.groups;
       const products = await ProductsModule.getByFilter(order, groups);
       res.json(products);
    }

    static async createProduct(req, res){
        
    }

    static async updateProduct(req, res){

    }

    static async deleteProduct(req, res){

    }
}