import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

const ensureIsAdmin = async ( req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const authenticatedUser = req.user;

  if (authenticatedUser.admin === false) {
    throw new AppError("User don`t have permission", 403);
  }

  return next();
};

export default ensureIsAdmin;
