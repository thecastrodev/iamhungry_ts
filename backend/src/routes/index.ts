import { Router } from "express";

import { startRoutes } from "./startRoutes";
import { usersRoutes } from "./usersRoutes";
import { authenticateRoutes } from "./authenticateRoutes";

const routes = Router();

routes.use("/", startRoutes);
routes.use("/user", usersRoutes);
routes.use("/session", authenticateRoutes);

export { routes };
