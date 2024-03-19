import express from "express";
import cors from "cors";
import path from "path"
import session from "express-session";
import {productsRouter} from "./routes/products.js";
import {collectionsRouter} from "./routes/collections.js";
import {stockRouter} from "./routes/stock.js";
import {uploadsRouter} from "./routes/uploads.js"; 
import {cartRouter} from "./routes/cart.js"


//prueba
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//

const app = express();
const PORT = process.env.PORT ?? 3000;

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
app.use("/uploads", uploadsRouter);
app.use("/products", productsRouter);
app.use("/collections", collectionsRouter);
app.use("/stock", stockRouter);
app.use("/cart", cartRouter);

//cargar las paginas:
app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "public", "client", "home.html"));
});

app.get("/nav/:dir", (req, res)=>{
    res.sendFile(path.join(__dirname, "public", "client", `${req.params.dir}`));
});

app.listen(PORT, ()=>{console.log(`server listening on port http://localhost:${PORT}`)});