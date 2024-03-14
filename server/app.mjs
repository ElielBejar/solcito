import express from "express";
import cors from "cors";
import {productsRouter} from "./routes/products.js";
import {collectionsRouter} from "./routes/collections.js";
import { stockRouter } from "./routes/stock.js";
import {uploadsRouter} from "./routes/uploads.js"; 

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use("/products", express.json());//middleware para formatear la data de las req a obj json
app.use("/collections", express.json());
app.use("/stock", express.json());
app.use(cors());
app.use("/uploads", uploadsRouter);
app.use("/products", productsRouter);
app.use("/collections", collectionsRouter);
app.use("/stock", stockRouter);

app.listen(PORT, ()=>{console.log(`server listening on port ${PORT}`)});