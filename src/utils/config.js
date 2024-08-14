import {config} from "dotenv";
config();

export const PORT = process.env.PORT ?? 3000;
export const HOST = `http://localhost:${PORT}`;
export const HOST_DATABASE = process.env.HOST_DATABASE;
export const PORT_DATABASE = process.env.PORT_DATABASE;
export const USER_DATABASE = process.env.USER_DATABASE;
export const PASSWORD_DATABASE = process.env.PASSWORD_DATABASE;
export const DATABASE = process.env.DATABASE;
export const USER = process.env.USER;
export const PASSWORD = process.env.PASSWORD;
export const EMAIL = process.env.EMAIL;
export const PASSWORD_EMAIL = process.env.PASSWORD_EMAIL;
export const PAGE_SIZE = process.env.PAGE_SIZE;
export const MIN_AMOUNT = process.env.MIN_AMOUNT

export const MERCADOPAGO_API_KEY = process.env.MERCADOPAGO_API_KEY; 
export const MERCADOPAGO_PUBLIC_KEY = process.env.MERCADOPAGO_PUBLIC_KEY;