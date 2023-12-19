import express, { Express } from "express";
import { interceptor } from "./errors/interceptor";
import "express-async-errors";

import { routes } from "./routes";
import { env } from "./utils/env";

const app: Express = express();
const port = env.port;

app.use(express.json());
app.use(routes);

app.use(interceptor);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
