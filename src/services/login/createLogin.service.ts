import { QueryConfig } from "pg";
import { createLoginSchema } from "../../schemas/login.schema";
import { iLoginRequest } from "../../interfaces/login.intertfaces";
import { iUserResultWithPassword } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { AppError } from "../../error";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import "dotenv/config";

const createLoginService = async ( loginData: iLoginRequest): Promise<string> => {
  const validateLoginData = createLoginSchema.parse(loginData);

  const queryString: string = `
    SELECT
      *
    FROM
      users
    WHERE
      email = $1;
  `;
  const queryConfigUser: QueryConfig = {
    text: queryString,
    values: [validateLoginData.email],
  };

  const queryResultUser: iUserResultWithPassword = await client.query(queryConfigUser);

  if (queryResultUser.rowCount === 0) {
    throw new AppError("Invalid email or password", 401);
  }

  const passwordMatch: boolean = await compare( loginData.password, queryResultUser.rows[0].password );

  if (!passwordMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  const token: string = sign(
    { email: queryResultUser.rows[0].email, admin: queryResultUser.rows[0].admin },
    String(process.env.SECRET_KEY!),
    { expiresIn: "24h", subject: String(queryResultUser.rows[0].id) }
  );

  return token;
};

export { createLoginService };
