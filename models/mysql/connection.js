import mysql from "mysql2/promise";
const config = {
    host:"localhost",
    port:3306,
    user:"root",
    password:"_45748541",
    database:"solcito"
}

export const connection = await mysql.createConnection(config);