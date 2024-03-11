//arcihvo para atender todas las peticiones para los productos solcito
import {Router} from "express";
import {ProductsController} from "../controllers/products.js";

export const productsRouter = Router();

//Manejador de requests
productsRouter.get("/:order", ProductsController.getBy);
productsRouter.get("/collection/:collection_code", ProductsController.getBy);
productsRouter.get("/product/:code/:print", ProductsController.getBy);
productsRouter.get("/product/:code", ProductsController.getBy);
productsRouter.get("/search/:search", ProductsController.getBy);
productsRouter.post("/filter", ProductsController.getBy);
/*productsRouter.patch("/", ProductsController.updateProduct);
productsRouter.delete("/", ProductsController.deleteProduct);*/
