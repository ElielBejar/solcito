import {connection} from "./connection.js";

export class StockModel{

    static async getAll(){
        const [info] = await connection.query("SELECT * FROM stock");
        return info;
    }

    static async getSizes(code, print){
        const [info] = await connection.query("SELECT id, size, quantity FROM stock WHERE code = ? AND print_code = ?", [code, print]);
        return info;
    }

    static async getQuantity(code, print, size){
        const [info] = await connection.query("SELECT quantity FROM stock WHERE code = ? AND print_code = ? AND size = ?", 
        [code, print, size]);
        return info;
    }

    static async addStock(stock){
       const [info] = await connection.query("INSERT INTO stock (code, print_code, size, quantity) VALUES (?,?,?,?)",
                                             [stock.code, stock.print, stock.size, stock.quantity]);
        return info;
    }

    static async updateStock(stock, id){
       const [info] = await connection.query("UPDATE stock SET code = ?, print_code = ?, size = ?, quantity = ? WHERE id = ?",
                                             [stock.code, stock.print, stock.size, stock.quantity, id]);
        return info;
    }

    static async deleteStock(id){
        return await connection.query("DELETE FROM stock WHERE id = ?", [id]);
    }
}