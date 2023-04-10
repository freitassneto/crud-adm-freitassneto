import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

const ensureIdWontChange = async ( req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  if (req.body.id || req.body.admin || req.body.active) {
    throw new AppError(
      "'Id', 'admin' and 'active' fields cannot be changed",
      409
    );
  }

  next();
};

export default ensureIdWontChange;
