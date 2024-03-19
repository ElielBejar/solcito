import express from "express";
import cors from "cors";
import {productsRouter} from "./routes/products.js";
import {collectionsRouter} from "./routes/collections.js";
import {stockRouter} from "./routes/stock.js";
import {uploadsRouter} from "./routes/uploads.js"; 
import {cartRouter} from "./routes/cart.js"
import session from "express-session";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(session({
    secret:"cart45748541",
    resave:true,
    saveUninitialized:true
}));
app.use("/products", express.json());//middleware para formatear la data de las req a obj json
app.use("/collections", express.json());
app.use("/stock", express.json());
app.use("/cart", express.json());
app.use("/uploads", uploadsRouter);
app.use("/products", productsRouter);
app.use("/collections", collectionsRouter);
app.use("/stock", stockRouter);
app.use("/cart", cartRouter);

app.listen(PORT, ()=>{console.log(`server listening on port ${PORT}`)});