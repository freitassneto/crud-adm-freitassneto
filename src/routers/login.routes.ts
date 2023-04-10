import { Router } from "express";
import { userLoginController } from "../controllers/login.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureValidData.middlewares";
import { createLoginSchema } from "../schemas/login.schema";

const loginRoutes: Router = Router();

loginRoutes.post( "", ensureDataIsValidMiddleware(createLoginSchema), userLoginController);

export default loginRoutes;