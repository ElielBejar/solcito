import express from "express";
import cors from "cors";
import {productsRouter} from "./routes/products.js";
import {collectionsRouter} from "./routes/collections.js";


const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());//middleware para formatear la data de las req a obj json
app.use(cors());
app.use("/products", productsRouter);
app.use("/collections", collectionsRouter);

app.listen(PORT, ()=>{console.log(`server listening on port ${PORT}`)});