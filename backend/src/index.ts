import express, { Express } from "express";
import { Interceptor } from "./errors/Interceptor";
import dotenv from "dotenv";

import { routes } from "./routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(routes);

app.use(Interceptor);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});