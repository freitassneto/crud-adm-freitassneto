import { QueryConfig } from "pg";
import { iUserResult, iUserWithoutPassword } from '../../interfaces/users.interfaces';
import { client } from "../../database";

const listSpecificUserService = async (userId: number): Promise<iUserWithoutPassword> => {
    const queryString: string = `
        SELECT
            us."id",
            us."name",
            us."email",
            us."admin",
            us."active"
        FROM
            users us
        WHERE
            id = $1;
    `;

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userId]
    };

    const queryResult: iUserResult = await client.query(queryConfig);

    return queryResult.rows[0];
}

export default listSpecificUserService;