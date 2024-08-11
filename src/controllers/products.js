import { ProductsModel } from "../models/mysql/products.js";
import { validateProduct } from "../utils/validations.js";

export class ProductsController {

   static async getBy(req, res) {
      let products;
      //el operador !! se usa para que se evalue el switch de forma booleana y funcione
      switch (true) {
         case !!(req.params.order && req.params.page):
            products = await ProductsModel.getByOrder(req.params.order, req.params.page);
            break;
         case !!(req.body.order && req.body.groups):
            products = await ProductsModel.getByFilter(req.body.order, req.body.groups, req.body.page);
            break;
         case !!req.params.collection_code:
            products = await ProductsModel.getByCollectionCode(req.params.collection_code);
            break;
         case !!(req.params.code && req.params.print):
            products = await ProductsModel.getByPrint(req.params.code, req.params.print);
            break;
         case !!req.params.code:
            products = await ProductsModel.getByCode(req.params.code);
            break;
         default:
            products = undefined;
            break;
      }
      res.json(products);
   }

   static async getByName(req, res){
      let products = await ProductsModel.getByName(req.params.search);
      res.json(products);
   }

   static async createProduct(req, res) {
      const valid_product = validateProduct(req.body);
      if (valid_product.error) {
         return res.status(400).json({ error: res.error });
      } else {
         const new_product = valid_product.data;
         ProductsModel.createProduct(new_product);
         res.json(new_product);
      }
   }

   static async updateProduct(req, res) {

   }

   static async deleteProduct(req, res) {
      await ProductsModel.deleteProduct(req.params.id);
   }
}