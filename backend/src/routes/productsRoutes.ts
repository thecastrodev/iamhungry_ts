import { Router } from "express";
import { ProductsController } from "../controllers/ProductsController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const productsRoutes = Router();

const controller = new ProductsController();

// public routes
productsRoutes.get("/", controller.index);
productsRoutes.get("/:id", controller.show);
productsRoutes.get("/name/:name", controller.listByName);

// private rotes
productsRoutes.post("/", ensureAuthenticate, controller.createProduct);

export { productsRoutes };
