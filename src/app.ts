import "express-async-errors";
import express, { Application } from "express";
import userRoutes from "./routers/users.routes";
import loginRoutes from "./routers/login.routes";
import { errorHandler } from "./error";

const app: Application = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/login", loginRoutes);

app.use(errorHandler);

export default app;
