import {Router} from "express";
import { orderController } from "../controllers/order.js";

export const orderRouter = Router();

orderRouter.get("/", orderController.getOrders);
orderRouter.get("/:id", orderController.getOrder);
orderRouter.patch("/status/:id/:state", orderController.changeState);
orderRouter.get("/shipping/:id", orderController.getShipping);
orderRouter.post("/shipping", orderController.addShipping);
orderRouter.post("/order", orderController.addOrder);
orderRouter.delete("/:id", orderController.deleteOrder);