import {Router} from "express";
import { StockController } from "../controllers/stock.js";

export const stockRouter = Router();

stockRouter.get("/", StockController.getAll);//no se usa este método
stockRouter.get("/sizes/:code/:print", StockController.getBy);
stockRouter.get("/:code/:print/:size", StockController.getQuantity);
stockRouter.get("/id/:code/:print/:size", StockController.getId);
stockRouter.post("/", StockController.addStock);
stockRouter.patch("/:id", StockController.updateStock);
stockRouter.delete("/:id", StockController.deleteStock);
