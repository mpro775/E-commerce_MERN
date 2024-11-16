
import dotenv from "dotenv";

import express from "express";
import mongoose from "mongoose";
import router from "../src/routes/userRoute";
import { seedInitialProducts } from "./services/productService";
import routerProduct from "./routes/productRoute";
import routerCart from "./routes/cartRoute";

dotenv.config();

const app = express()
const port = 3001;



mongoose.connect(process.env.DATABASE_URL || "")
.then(() => console.log("Mongo Success"))
.catch((err) => console.log("Faild" , err));

app.use(express.json());

seedInitialProducts();

app.use("/user", router);
app.use("/product", routerProduct);
app.use("/cart", routerCart);

app.listen(port,()=>{
    console.log(`Server is running at: http://localhost:${port}`);
})
