import { StockModel } from "../models/mysql/stock.js";
import { validateStock } from "../utils/validations.js";
import { validatePartialStock } from "../utils/validations.js";

export class StockController {

    static async getAll(req, res){
        const stock = await StockModel.getAll();
        res.json(stock);
    }

    static async getId(req, res){
        const stock = await StockModel.getId(req.params.code, req.params.print, req.params.size);
        res.json(stock);
    }

    static async getBy(req, res) {
        let sizes;
        switch (true) {
            case !!(req.params.code && req.params.print):
                sizes = await StockModel.getSizes(req.params.code, req.params.print);
                break;
            default: sizes = undefined;
                break;
        }
        res.json(sizes);
    }

    static async getQuantity(req, res){
        const quantity = await StockModel.getQuantity(req.params.code, req.params.print, req.params.size);
        res.json(quantity);
    }

    static async addStock(req, res){
        const validStock = validateStock(req.body);
        if(validStock.error){
            res.status(400).json({error:res.error});
        }else{
            const new_stock = validStock.data;
            StockModel.addStock(new_stock);
            res.json(new_stock);
        }
    }

    static async updateStock(req, res){
        const validStock = validatePartialStock(req.body);
        if(validStock.error){
            res.status(400).json({error:res.error});
        }else{
            const new_stock = validStock.data;
            StockModel.updateStock(new_stock, req.params.id);
            res.json(new_stock);
        }
    }

    static async deleteStock(req, res){
        await StockModel.deleteStock(req.params.id);
    }
}