import {connection} from "./connection.js";

export class orderModel{

    static async insertShipping(shipping){
        const sql = "INSERT INTO pedidos (state, name, phone, email, direction, transport, localidad, provincia, codigo_postal" +
                     ", cuit_dni) VALUES ('Pendiente', ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const [data] = await connection.query(sql, [shipping.name, shipping.phone, shipping.email, shipping.direction, shipping.transport, shipping.localidad, 
                               shipping.provincia, shipping.codigo_postal, shipping.cuit_dni]);
        return data;
    }

    static async insertArticle(article, quantity, id_order){
       console.log("estoy en insert article del model");
       const sql = "INSERT INTO articulos_pedido (id_pedido, code, print, size, img, quantity, price) VALUES (?, ?, ?, ?, ?, ?, ?)";
       await connection.query(sql, [id_order, article.code_article, article.print, article.size, article.img, quantity, article.price]);
    }

    static async getOrders(){
       const sql = "SELECT id, state, name, phone, email FROM pedidos";
       const [info] = await connection.query(sql);
       return info;
    }

    static async getShipping(id){
       const sql = "SELECT * FROM pedidos WHERE id = ?";
       const [info] = await connection.query(sql, [id]);
       return info;
    }

    static async getOrder(id){
        const sql = "SELECT * FROM articulos_pedido WHERE id_pedido = ?";
        const [info] = await connection.query(sql, [id]);
        return info;
    }

    static async changeState(id, state){
        const sql = "UPDATE pedidos SET state = ? WHERE id = ?";
        const [info] = await connection.query(sql, [state, id]);
        return info;
    }

    static async deleteOrder(id){
        return await connection.query("DELETE FROM pedidos WHERE id = ?", [id]);
    }

}