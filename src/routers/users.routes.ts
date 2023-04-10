import { Router } from "express";
import {
  createUsersController,
  listUsersController,
  listSpecificUserController,
  deleteUserController,
  partialUpdateUserController,
  activateUserController,
} from "../controllers/users.controllers";
import ensureUserExists from "../middlewares/ensureUserExists.middlewares";
import ensureEmailExists from "../middlewares/ensureEmailExists.middlewares";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middlewares";
import ensureDataIsValidMiddleware from "../middlewares/ensureValidData.middlewares";
import ensureIdWontChange from "../middlewares/ensureIdWontChange.middlewares";
import ensureIsAdmin from "../middlewares/ensureIsAdmin.middlewares";
import ensureUserIsActive from "../middlewares/ensureUserIsActive.middlewares";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureEmailExists,
  ensureDataIsValidMiddleware(createUserSchema),
  createUsersController
);
userRoutes.get(
  "",
  ensureTokenIsValidMiddleware,
  ensureIsAdmin,
  listUsersController
);
userRoutes.get(
  "/:id",
  ensureTokenIsValidMiddleware,
  ensureUserExists,
  listSpecificUserController
);
userRoutes.patch(
  "/:id",
  ensureTokenIsValidMiddleware,
  ensureUserExists,
  ensureEmailExists,
  ensureDataIsValidMiddleware(updateUserSchema),
  ensureIdWontChange,
  partialUpdateUserController
);
userRoutes.delete(
  "/:id",
  ensureTokenIsValidMiddleware,
  ensureUserExists,
  deleteUserController
);
userRoutes.put(
  "/:id/recover",
  ensureTokenIsValidMiddleware,
  ensureIsAdmin,
  ensureUserIsActive,
  activateUserController
);

export default userRoutes;
