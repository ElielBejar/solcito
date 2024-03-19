import { CollectionsModel } from "../models/mysql/collections.js";
import { validateCollection } from "../utils/validations.js";

export class CollectionsController{

    static async getAll(req, res){
        const data = await CollectionsModel.getAll();
        res.json(data);
    }

    static async createCollection(req, res){
        const valid_collection = validateCollection(req.body);
        if(valid_collection.error){
            return res.status(400).json({error:res.error});
        }else{
            const new_collection = valid_collection.data;
            CollectionsModel.createCollection(new_collection);
            res.json(new_collection);
        }
    }

    static async deleteCollection(req, res){
        await CollectionsModel.deleteCollection(req.params.collection_code);
    }
}