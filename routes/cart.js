import {Router} from "express";
import { cartController } from "../controllers/cart.js";

export const cartRouter = Router();

cartRouter.get("/", cartController.defineCart);//declara al carrito en req.process
cartRouter.post("/", cartController.addProduct);
