import express, { Express } from "express";
import { interceptor } from "./errors/interceptor";
import "express-async-errors";
import dotenv from "dotenv";

import { routes } from "./routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(routes);

app.use(interceptor);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
