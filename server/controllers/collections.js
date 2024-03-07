import { CollectionsModel } from "../models/mysql/collections.js";

export class CollectionsController{

    static async getAll(req, res){
        const data = await CollectionsModel.getAll();
        res.json(data);
    }
}