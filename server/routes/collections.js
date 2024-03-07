import {Router} from "express";
import {CollectionsController} from "../controllers/collections";

export const collectionsRouter = Router();

collectionsRouter.get("/", CollectionsController.getAll);
//collectionsRouter.post("/", CollectionsController.createCollection);
//collectionsRouter.patch("/", CollectionsController.updateCollection);
//collectionsRouter.delete("/", CollectionsController.deleteCollection);