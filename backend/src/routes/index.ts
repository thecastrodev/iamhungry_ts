import { Router } from "express";

import { startRoutes } from "./startRoutes.ts";

const routes = Router();

routes.use("/", startRoutes);

export { routes };
