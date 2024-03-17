import {Router} from "express";
import { StockController } from "../controllers/stock.js";

export const stockRouter = Router();

stockRouter.get("/", StockController.getAll);
stockRouter.get("/sizes/:code/:print", StockController.getBy);
stockRouter.post("/", StockController.addStock);
stockRouter.patch("/:id", StockController.updateStock);
stockRouter.delete("/:id", StockController.deleteStock);
