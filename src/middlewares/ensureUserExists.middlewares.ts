import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../error";

const ensureUserExists = async ( req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const userId: number = Number(req.params.id);

  const queryString: string = `
        SELECT
            *
        FROM
            users
        WHERE
            id = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    throw new AppError("User does not exist!", 404);
  }

  next();
};

export default ensureUserExists;
