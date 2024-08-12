import { MercadoPagoConfig, Preference } from 'mercadopago';
import { MERCADOPAGO_API_KEY, MERCADOPAGO_PUBLIC_KEY } from '../utils/config.js';


const client = new MercadoPagoConfig({ accessToken: `${MERCADOPAGO_API_KEY}` });

function getFloatPrice(string_price) {
    return parseFloat(string_price.slice(1, string_price.length));
}

export class paymentController{

    static async getPublicKey(req, res){
        res.json({publicKey:`${MERCADOPAGO_PUBLIC_KEY}`});
    }

    static async createOrder(req, res){

        let items_cart = [];
        for(let i = 0; i<req.session.cart.length; i++){
            items_cart.push({
               title:req.session.cart[i].name,
               quantity:Number(req.body.quantities[i]),
               unit_price:Number(getFloatPrice(req.session.cart[i].price)),
               currency_id:"ARS",
            });
        }
        try{
          const body = {
            items:items_cart,
            back_urls:{
                success:"http://localhost:3000/nav/order_state.html?state=success",
                failure:"http://localhost:3000/nav/order_state.html?state=failure",
                pending:"http://localhost:3000/nav/order_state.html?state=pending",
            },
            auto_return:"approved",
          };
          //req.session.cart = [];
          const preference = new Preference(client);
          const result = await preference.create({body});
          res.json({
            id:result.id,
            init_point:result.init_point,
          });
        }catch(error){
          console.log(error);
          res.status(500).json({error:"Error al crear el pago"});
        }
    }
}