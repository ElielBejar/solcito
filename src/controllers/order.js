import { orderModel } from "../models/mysql/order.js";

export class orderController{

    static async addShipping(req, res){
        const shipping = await orderModel.insertShipping(req.body);
        res.json({order_id:shipping.insertId});
    }
    
    static async addOrder(req, res){
        for(let i = 0; i<req.session.cart.length; i++){
            await orderModel.insertArticle(req.session.cart[i], req.body.quantities[i], req.body.id_order);
        }
        res.json({message:"Se agrego el pedido"});
    }

    static async getOrders(req, res){
        const orders = await orderModel.getOrders();
        res.json(orders);
    }

    static async getOrder(req, res){
        const id = req.params.id;
        const info = await orderModel.getOrder(id);
        res.json(info);
    }

    static async getShipping(req, res){
        const id = req.params.id;
        const info = await orderModel.getShipping(id);
        res.json(info);
    }
}