import express from "express";
import {
  addItemToCart,
  checkout,
  clearCart,
  deleteItemIncart,
  getActiveCartForUser,
  updateItemInCart,
} from "../services/cartService";
import validateJWT from "../middlewares/validateJWT";
import { ExtendRequest } from "../types/extendedRequest";

const routerCart = express.Router();

routerCart.get("/", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const cart = await getActiveCartForUser({ userId, populateProduct: true });
    res.status(200).send(cart);
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
});

routerCart.delete("/", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const response = await clearCart({ userId });
    res.status(response.statusCode).send(response.data);
  } catch {
    res.status(500).send("Something went wrong!");
  }
});

routerCart.post("/items", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { productId, quantity } = req.body;
    const response = await addItemToCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);
  } catch {
    res.status(500).send("Something went wrong!");
  }
});

routerCart.put("/items", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { productId, quantity } = req.body;
    const response = await updateItemInCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);
  } catch {
    res.status(500).send("Something went wrong!");
  }
});

routerCart.delete(
  "/items/:productId",
  validateJWT,
  async (req: ExtendRequest, res) => {
    try {
      const userId = req?.user?._id;
      const { productId } = req.params;
      const response = await deleteItemIncart({ userId, productId });
      res.status(response.statusCode).send(response.data);
    } catch {
      res.status(500).send("Something went wrong!");
    }
  }
);

routerCart.post("/checkout", validateJWT, async (req: ExtendRequest, res) => {
  try {
    const userId = req?.user?._id;
    const { address } = req.body;
    const response = await checkout({ userId, address });
    res.status(response.statusCode).send(response.data);
  } catch {
    res.status(500).send("Something went wrong!");
  }
});

export default routerCart;
