import mysql from "mysql2/promise";
const config = {
    host:"localhost",
    port:3306,
    user:"root",
    password:"_45748541",
    database:"solcito"
}

const connection = await mysql.createConnection(config);

export class ProductsModule {
    
    static async getByOrder(order) {
        console.log(order);
        switch(order){
            case "cheap":
                const [info] = await connection.query(
                    "SELECT * FROM articulos ORDER BY price ASC"
                );
                return info;
                break;
            case "expensive": 
                let [info_product] = await connection.query(
                    "SELECT * FROM articulos ORDER BY price DESC"
                );
                return info_product;
                break;
        }
    }

    static async getByFilter(order, groups){

    }
}