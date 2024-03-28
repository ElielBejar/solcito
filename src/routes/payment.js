import {Router} from "express";
import {paymentController} from "../controllers/payment.js";

export const paymentRouter = Router();

paymentRouter.post("/", paymentController.createOrder);