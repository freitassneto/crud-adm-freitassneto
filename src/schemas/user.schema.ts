import { hashSync } from "bcryptjs";
import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().max(20),
  email: z.string().email().max(100),
  password: z.string().max(120).transform((pass) => {
    return hashSync(pass, 10);
  }),
  admin: z.boolean().default(false),
  active: z.boolean().default(true),
});

const responseUserSchema = createUserSchema.extend({
  id: z.number().positive().int(),
});

const responseUserSchemaWithoutPassword = responseUserSchema.omit({ password: true });

const allUsersSchema = z.array(responseUserSchema);

const updateUserSchema = z.object({
  name: z.string().max(20).optional(),
  email: z.string().email().max(100).optional(),
  password: z.string().max(120).transform((pass) => {
    return hashSync(pass, 10);
  }).optional(),
  admin: z.boolean().default(false).optional(),
  active: z.boolean().default(true).optional(),
})

export {
  createUserSchema,
  responseUserSchema,
  responseUserSchemaWithoutPassword,
  allUsersSchema,
  updateUserSchema
};
