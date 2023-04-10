import { QueryConfig } from "pg";
import { client } from "../../database";
import {
  iUserResult,
  iUserWithoutPassword,
} from "../../interfaces/users.interfaces";

const activateUserService = async ( userId: number ): Promise<iUserWithoutPassword> => {
  const queryString: string = `
        UPDATE
            users
        SET
            "active" = true
        WHERE
            id = $1
        RETURNING id, name, email, admin, active;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryResult: iUserResult = await client.query(queryConfig);
  
  return queryResult.rows[0];
};

export default activateUserService;
