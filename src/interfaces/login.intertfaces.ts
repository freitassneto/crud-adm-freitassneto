import { createLoginSchema } from "../schemas/login.schema";
import { z } from "zod";

type iLoginRequest = z.infer<typeof createLoginSchema>;

export { iLoginRequest };
