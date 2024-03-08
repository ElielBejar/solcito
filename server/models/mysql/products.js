import {connection} from "./connection.js";
function sqlOrder(order){
    let sql = "";
    switch(order){
        case "cheap":
            sql = " ORDER BY price ASC";
            break;
        case "expensive": 
            sql = " ORDER BY price DESC";
            break;
        case "recently":
            sql = " ORDER BY date_created DESC";
            break;
        case "trend": 
            sql = " ORDER BY price ASC";
    }
    return sql;
}

export class ProductsModel {
    
    static async getByOrder(order) {
        
        const [info] = await connection.query("SELECT * FROM articulos"+sqlOrder(order));
        return info;
    }

    static async getByFilter(order, groups){
        const placeholders = groups.map(() => '?').join(',');
        const sql = `SELECT * FROM articulos WHERE group_code IN (${placeholders})` + sqlOrder(order); 
        const [info] = await connection.query(sql, groups);
        return info;
    }

    static async getByCollectionCode(collection_code){
        const [info] = await connection.query("SELECT * FROM articulos WHERE colection_code = ?", [collection_code]);
        console.log(info);
        console.log("-----------------------------------------");
        return info;
    }

    static async getByCode(code){
        const [info] = await connection.query("SELECT * FROM articulos WHERE code = ?", [code]);
        return info;
    }
}