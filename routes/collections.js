import {Router} from "express";
import {CollectionsController} from "../controllers/collections.js";

export const collectionsRouter = Router();

collectionsRouter.get("/", CollectionsController.getAll);
collectionsRouter.post("/", CollectionsController.createCollection);
//collectionsRouter.patch("/", CollectionsController.updateCollection);
collectionsRouter.delete("/:collection_code", CollectionsController.deleteCollection);