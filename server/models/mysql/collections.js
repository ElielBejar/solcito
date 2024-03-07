import {connection} from "./connection.js";

export class CollectionsModel{

    static async getAll(){
       const sql = "SELECT * FROM colecciones";  
       const [info] = await connection.query(sql);
       return info;
    }
}