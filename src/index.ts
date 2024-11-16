import express from "express";
import mongoose from "mongoose";
import router from "../src/routes/userRoute";
import { seedInitialProducts } from "./services/productService";
import routerProduct from "./routes/productRoute";
import routerCart from "./routes/cartRoute";

const app = express()
const port = 3001;



mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")
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
