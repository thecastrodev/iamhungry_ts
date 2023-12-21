import { Router } from "express";
import { SalesController } from "../controllers/SalesController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const salesRoutes = Router();

const controller = new SalesController();

// public routes
salesRoutes.get("/", ensureAuthenticate, controller.index);
salesRoutes.post("/", ensureAuthenticate, controller.create);

export { salesRoutes };
