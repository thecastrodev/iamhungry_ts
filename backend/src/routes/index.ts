import { Router } from "express";

import { startRoutes } from "./startRoutes";
import { usersRoutes } from "./usersRoutes";
import { salesRoutes } from "./salesRoutes";
import { productsRoutes } from "./productsRoutes";
import { authenticateRoutes } from "./authenticateRoutes";

const routes = Router();

routes.use("/", startRoutes);
routes.use("/product", productsRoutes);
routes.use("/sale", salesRoutes);
routes.use("/user", usersRoutes);
routes.use("/session", authenticateRoutes);

export { routes };
