import { StockModel } from "../models/mysql/stock.js";

export class StockController {

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
}