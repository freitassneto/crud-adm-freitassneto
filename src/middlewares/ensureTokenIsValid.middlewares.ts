import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../error";
import "dotenv/config";

const ensureTokenIsValidMiddleware = async ( req: Request, res: Response, next: NextFunction): Promise<void> => {
  let token = req.headers.authorization;

  if (!token) {
    throw new AppError("Token is missing", 401);
  }

  token = token.split(" ")[1];

  verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }

    req.user = {
      id: Number(decoded.sub),
      email: decoded.email,
      admin: decoded.admin,
    };
    next();
  });
};

export default ensureTokenIsValidMiddleware;
