import mysql from "mysql2/promise";
import { HOST_DATABASE, PORT_DATABASE, USER_DATABASE, PASSWORD_DATABASE, DATABASE } from "../../utils/config.js";
const config = {
    host:HOST_DATABASE,
    port:PORT_DATABASE,
    user:USER_DATABASE,
    password:PASSWORD_DATABASE,
    database:DATABASE
}

export const connection = await mysql.createConnection(config);