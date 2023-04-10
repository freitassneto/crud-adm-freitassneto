import { QueryResult } from "pg";
import {
  createUserSchema,
  responseUserSchema,
  responseUserSchemaWithoutPassword,
  allUsersSchema,
} from "../schemas/user.schema";
import { z } from "zod";

type iUserRequest = z.infer<typeof createUserSchema>;
type iUser = z.infer<typeof responseUserSchema>;
type iUserWithoutPassword = z.infer<typeof responseUserSchemaWithoutPassword>;
type iUserResult = QueryResult<iUserWithoutPassword>;
type iUserResultWithPassword = QueryResult<iUser>;
type iAllUsersReturn = z.infer<typeof allUsersSchema>;

export {
  iUserRequest,
  iUser,
  iUserWithoutPassword,
  iUserResult,
  iAllUsersReturn,
  iUserResultWithPassword,
};
