import {connection} from "./connection.js";

export class CollectionsModel{

    static async getAll(){
       const sql = "SELECT * FROM colecciones";  
       const [info] = await connection.query(sql);
       return info;
    }

    static async createCollection(new_collection){
       const sql = `INSERT INTO colecciones (colection_code, name, img) values (?, ?, ?)`;
       await connection.query(sql, [new_collection.code, new_collection.name, new_collection.img]);
    }
}