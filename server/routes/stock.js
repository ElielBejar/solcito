import {Router} from "express";
import { StockController } from "../controllers/stock.js";

export const stockRouter = Router();

stockRouter.get("/sizes/:code/:print", StockController.getBy);

