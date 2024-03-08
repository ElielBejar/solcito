//arcihvo para atender todas las peticiones para los productos solcito
import {Router} from "express";
import {ProductsController} from "../controllers/products.js";

export const productsRouter = Router();

//Manejador de requests
productsRouter.get("/:order", ProductsController.getByOrder);
productsRouter.get("/collection/:collection_code", ProductsController.getByCollectionCode);
productsRouter.get("/product/:code/:print", ProductsController.getByPrint);
productsRouter.get("/product/:code", ProductsController.getByCode);
productsRouter.post("/filter", ProductsController.getByFilter);
/*productsRouter.patch("/", ProductsController.updateProduct);
productsRouter.delete("/", ProductsController.deleteProduct);*/
