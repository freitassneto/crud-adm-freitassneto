import { QueryConfig } from "pg";
import format from "pg-format"
import { iUser, iUserRequest, iUserResultWithPassword } from "../../interfaces/users.interfaces"
import { client } from "../../database";

const partialUpdateUserService = async (userId: number, userData: iUserRequest): Promise<iUser> => {
    const queryString: string = format(
        `
        UPDATE
            users
        SET(%I) = ROW(%L)
        WHERE
            id = $1
        RETURNING id, name, email, admin, active; 
        `,
        Object.keys(userData),
        Object.values(userData)
    );

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userId]
    }

    const queryResult: iUserResultWithPassword = await client.query(queryConfig);

    return queryResult.rows[0]

};


export default partialUpdateUserService;