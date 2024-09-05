import { MercadoPagoConfig, Preference } from 'mercadopago';
import { SIPAGO_CLIENT_ID, SIPAGO_CLIENT_SECRET} from '../utils/config.js';


//const client = new MercadoPagoConfig({ accessToken: `${MERCADOPAGO_API_KEY}` });

function getFloatPrice(string_price) {
  return parseFloat(string_price.slice(1, string_price.length));
}

function getItemsSP(cart, quantities){
  let items_cart = [];
  for (let i = 0; i < cart.length; i++) {
    items_cart.push({
      id:(i+1),
      name:cart[i].name,
      unit_price:{
        currency:"032",
      },
      amount:Number(getFloatPrice(cart[i].price))*10,
      quantity: Number(quantities[i]),
    });
  }
  return items_cart;
}

export class paymentController {

  static async getClientCredentials(req, res){
    res.json({client_id: `${SIPAGO_CLIENT_ID}`, client_secret:`${SIPAGO_CLIENT_SECRET}`});
  }

  static async getPublicKey(req, res) {
    res.json({ publicKey: `${MERCADOPAGO_PUBLIC_KEY}` });
  }

  static async createOrder(req, res) {

    let items_cart = [];
    for (let i = 0; i < req.session.cart.length; i++) {
      items_cart.push({
        title: req.session.cart[i].name,
        quantity: Number(req.body.quantities[i]),
        unit_price: Number(getFloatPrice(req.session.cart[i].price)),
        currency_id: "ARS",
      });
    }
    try {
      const body = {
        items: items_cart,
        back_urls: {
          success: "http://localhost:3000/nav/order_state.html?state=success",
          failure: "http://localhost:3000/nav/order_state.html?state=failure",
          pending: "http://localhost:3000/nav/order_state.html?state=pending",
        },
        auto_return: "approved",
      };
      //req.session.cart = [];
      const preference = new Preference(client);
      const result = await preference.create({ body });
      res.json({
        id: result.id,
        init_point: result.init_point,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al crear el pago" });
    }
  }

  static async createOrderSP(req, res) {
    const url = 'https://api-cabal.preprod.geopagos.com/api/v2/orders';
    let getItems = getItemsSP(req.session.cart, req.body.quantities);
    const data = {
      data: {
        attributes: {
          currency: "032",
          items:getItems,
        }
      }
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json',
        'Authorization': `Bearer ${req.body.access_token}`
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(order => {
        console.log(order);
        res.json(order);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}