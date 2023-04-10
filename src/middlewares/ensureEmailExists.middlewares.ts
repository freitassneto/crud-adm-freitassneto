import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../error";

const ensureEmailExists = async ( req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const userData = req.body;

  const queryStringExistingEmail: string = `
    SELECT
      *
    FROM
      users
    WHERE
      email = $1;
  `;

  const queryConfigExistingUser: QueryConfig = {
    text: queryStringExistingEmail,
    values: [userData.email],
  };

  const queryResultExistingUser: QueryResult = await client.query(
    queryConfigExistingUser
  );

  if (queryResultExistingUser.rowCount > 0) {
    throw new AppError("E-mail already registered!", 409);
  }

  next();
};

export default ensureEmailExists;
