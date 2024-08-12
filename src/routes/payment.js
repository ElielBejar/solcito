import {Router} from "express";
import {paymentController} from "../controllers/payment.js";

export const paymentRouter = Router();

paymentRouter.get("/", paymentController.getPublicKey);
paymentRouter.post("/", paymentController.createOrder);