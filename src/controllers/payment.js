import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: 'TEST-4198210971943585-032807-9ad024b328b110f3c68574e065003472-553899564' });


export class paymentController{

    static async createOrder(req, res){
        try{
          const body = {
            items:[{
                title:req.body.title,
                quantity:Number(req.body.quantity),
                unit_price:Number(req.body.price),
                currency_id:"ARS",
            }],
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
          });
        }catch(error){
          console.log(error);
          res.status(500).json({error:"Error al crear el pago"});
        }
    }
}