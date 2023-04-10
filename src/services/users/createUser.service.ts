import { iUserRequest, iUserResult, iUserWithoutPassword } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import format from "pg-format";
import { createUserSchema } from "../../schemas/user.schema";

const createUsersService = async ( userData: iUserRequest): Promise<iUserWithoutPassword> => {
  const validatedUserData = createUserSchema.parse(userData);

  const queryString: string = format(
    `
        INSERT INTO
            users(%I)
        VALUES (%L)
        RETURNING id, name, email, admin, active;
    `,
    Object.keys(validatedUserData),
    Object.values(validatedUserData)
  );

  const queryResult: iUserResult = await client.query(queryString);

  return queryResult.rows[0];
};

export default createUsersService;
