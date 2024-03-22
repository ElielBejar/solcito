import {config} from "dotenv";
config();

export const PORT = 3000;
export const HOST = `http://localhost:${PORT}`;
export const USER = process.env.USER;
export const PASSWORD = process.env.PASSWORD;

export const MERCADOPAGO_API_KEY = process.env.MERCADOPAGO_API_KEY; 