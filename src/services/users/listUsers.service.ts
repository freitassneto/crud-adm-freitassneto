import { client } from "../../database";
import { iAllUsersReturn } from "../../interfaces/users.interfaces";

const listUsersService = async (): Promise<iAllUsersReturn> => {
  const queryString: string = `
        SELECT
            *
        FROM
            users;
    `;

  const queryResult = await client.query(queryString);
  return queryResult.rows;
};

export default listUsersService;
