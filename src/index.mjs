import express from "express";
import cors from "cors";
import path from "path"
import session from "express-session";
import {productsRouter} from "./routes/products.js";
import {collectionsRouter} from "./routes/collections.js";
import {stockRouter} from "./routes/stock.js";
import {uploadsRouter} from "./routes/uploads.js"; 
import {cartRouter} from "./routes/cart.js"
import {paymentRouter} from "./routes/payment.js";
import {mailRouter} from "./routes/mail.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {PORT, HOST, USER, PASSWORD} from "./utils/config.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.use(cors());
app.use(session({
    secret:"cart45748541",
    resave:true,
    saveUninitialized:true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/products", express.json());//middleware para formatear la data de las req a obj json
app.use("/collections", express.json());
app.use("/stock", express.json());
app.use("/cart", express.json());
app.use("/admin", express.json());
app.use("/payment", express.json());

app.use("/uploads", uploadsRouter);
app.use("/products", productsRouter);
app.use("/collections", collectionsRouter);
app.use("/stock", stockRouter);
app.use("/cart", cartRouter);
app.use("/payment", paymentRouter);
app.use("/mail", mailRouter);

app.get("/nav/:dir", (req, res)=>{
    res.sendFile(path.join(__dirname, "public", "client", `${req.params.dir}`));
});

app.get("/admin/session", (req, res)=>{
   if(req.session.login){
    res.json({login:"true"});
   }else{
    res.json({login:"false"});
   }
});

app.post("/admin/login", function(req, res){

    if(req.body.user == `${USER}` && req.body.password == `${PASSWORD}`){
        req.session.login = true;
        res.json({login:"true"});
    }else{
        res.json({login:"false"});
    }
});

app.listen(PORT, ()=>{console.log(`server listening on port ${HOST}`)});