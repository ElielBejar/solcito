import {connection} from "./connection.js";

export class StockModel{

    static async getSizes(code, print){
        const [info] = await connection.query("SELECT size, quantity FROM stock WHERE code = ? AND print_code = ?", [code, print]);
        return info;
    }
}