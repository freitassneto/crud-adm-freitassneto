import { Request, Response } from "express";
import createUsersService from "../services/users/createUser.service";
import listSpecificUserService from "../services/users/listSpecificUser.service";
import listUsersService from "../services/users/listUsers.service";
import deleteUserService from "../services/users/deleteUser.service";
import partialUpdateUserService from "../services/users/partialUpdateUser.service";
import activateUserService from "../services/users/activateUser.service";
import {
  iUserRequest,
  iUserWithoutPassword,
} from "../interfaces/users.interfaces";

const createUsersController = async ( req: Request, res: Response): Promise<Response> => {
  const newUser: iUserWithoutPassword = await createUsersService(req.body);

  return res.status(201).json(newUser);
};

const listUsersController = async ( req: Request, res: Response): Promise<Response> => {
  const users = await listUsersService();

  return res.status(200).json(users);
};

const listSpecificUserController = async ( req: Request, res: Response): Promise<Response> => {
  const userId: number = Number(req.params.id);

  const listedUser = await listSpecificUserService(userId);

  return res.json(listedUser);
};

const partialUpdateUserController = async ( req: Request, res: Response): Promise<Response> => {
  try {
    const userId: number = Number(req.params.id);
    const userData: iUserRequest = req.body;

    const updatedUser = await partialUpdateUserService(userId, userData);

    return res.json(updatedUser);
  } catch (error: any) {
    if (error.message.includes("syntax error at or near")) {
      return res.status(404).json({
        message: "'Id', 'admin' and 'active' fields cannot be changed",
      });
    }
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};

const deleteUserController = async ( req: Request, res: Response): Promise<Response> => {
  const userId: number = parseInt(req.params.id);

  await deleteUserService(userId);

  return res.status(204).json();
};

const activateUserController = async ( req: Request, res: Response): Promise<Response> => {
  const userId: number = parseInt(req.params.id);

  const updatedUser = await activateUserService(userId);

  return res.status(200).json(updatedUser);
};

export {
  createUsersController,
  listUsersController,
  listSpecificUserController,
  partialUpdateUserController,
  deleteUserController,
  activateUserController,
};
