import { ProductsModel } from "../models/mysql/products.js";

export class ProductsController{

    static async getByOrder(req, res){
        const {order} = req.params;
        const products = await ProductsModel.getByOrder(order);
        res.json(products);
    }

    static async getByFilter(req, res){
       const order = req.body.order;
       const groups = req.body.groups;
       const products = await ProductsModel.getByFilter(order, groups);
       res.json(products);
    }

    static async getByCollectionCode(req, res){
       const {collection_code} = req.params;
       const products = await ProductsModel.getByCollectionCode(collection_code);
       res.json(products);
    }

    static async getByCode(req, res){
       const {code} = req.params;
       const products = await ProductsModel.getByCode(code);
       res.json(products);
    }

    static async createProduct(req, res){
       
    }

    static async updateProduct(req, res){

    }

    static async deleteProduct(req, res){

    }
}