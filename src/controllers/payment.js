import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: 'TEST-4198210971943585-032807-9ad024b328b110f3c68574e065003472-553899564' });

function getFloatPrice(string_price) {
    return parseFloat(string_price.slice(1, string_price.length));
}

export class paymentController{

    static async createOrder(req, res){

        let items_cart = [];
        for(let i = 0; i<req.session.cart.length; i++){
            items_cart.push({
               title:req.session.cart[i].name,
               quantity:Number(req.body.quantities[i]),
               unit_price:Number(getFloatPrice(req.session.cart[i].price))
            });
        }

        try{
          const body = {
            items:items_cart,
            back_urls:{
                success:"https://www.youtube.com/",
                failure:"https://www.youtube.com/",
                pending:"https://www.youtube.com/",
            },
            auto_return:"approved",
          };
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