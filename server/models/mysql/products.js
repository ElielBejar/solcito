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

    static async executeQuery(sql, params){
       const [info] = await connection.query(sql, params);
       return info;
    }
    
    static async getByOrder(order) {
        return await this.executeQuery("SELECT * FROM articulos WHERE print_code = 1"+sqlOrder(order), []);
    }

    static async getByFilter(order, groups){
        const placeholders = groups.map(() => '?').join(',');
        return await this.executeQuery(`SELECT * FROM articulos WHERE print_code = 1 AND group_code IN (${placeholders})` + sqlOrder(order), groups);
    }

    static async getByCollectionCode(collection_code){
        return await this.executeQuery("SELECT * FROM articulos WHERE colection_code = ?", [collection_code]);
    }

    static async getByPrint(code, print){
        return await this.executeQuery("SELECT * FROM articulos WHERE code = ? AND print_code = ?", [code, print]);
    }

    static async getByCode(code){
       return await this.executeQuery("SELECT * FROM articulos WHERE code = ?", [code]);
    }

    static async getByName(name){
       const param = '%' + name + '%';
       const params = [param];
       return await this.executeQuery("SELECT * FROM articulos WHERE name LIKE ? AND print_code = 1", params);
    }

    static async createProduct(new_product){
       const sql = "INSERT INTO articulos (code, name, colection_code, print_code, img, price, group_code, sales) VALUES"+
                   " (?, ?, ?, ?, ?, ?, ?, ?)";
       return await connection.query(sql, [new_product.code, new_product.name, new_product.collection, new_product.print, 
                                           new_product.img, new_product.price, new_product.group, 0]);
    }

    static async deleteProduct(id){
        return await connection.query("DELETE FROM articulos WHERE id = ?", [id]);
    }
}