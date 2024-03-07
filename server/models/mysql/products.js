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

export class ProductsModule {
    
    static async getByOrder(order) {
        
        const [info] = await connection.query("SELECT * FROM articulos"+sqlOrder(order));
        return info;
    }

    static async getByFilter(order, groups){
        const placeholders = groups.map(() => '?').join(',');
        const sql = `SELECT * FROM articulos WHERE group_code IN (${placeholders})` + sqlOrder(order); 
        console.log(sql);
        const [info] = await connection.query(sql, groups);
        console.log(info);
        return info;
    }
}