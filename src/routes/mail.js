import {Router} from "express";
import {mailController} from "../controllers/mail.js";

export const mailRouter = Router();

mailRouter.get("/", mailController.sendEmail);