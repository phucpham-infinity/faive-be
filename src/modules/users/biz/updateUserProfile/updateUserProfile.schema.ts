import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

export const updateUserProfileBodySchema = z
  .object({
    first_name: z.string().min(1),
    last_name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string(),
    username: z.string().optional(),
    bio: z.string(),
    tiktok_user: z.string(),
    instagram_user: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const updateUserProfileJsonSchema = zodToJsonSchema(
  updateUserProfileBodySchema,
  {
    name: "updateUserProfileJsonSchema",
  }
)?.definitions?.updateUserProfileJsonSchema;

export const updateUserProfileSchema = {
  tags: ["users"],
  description: "Get user by id",
  security: [{ bearerAuth: [] }],
  body: updateUserProfileJsonSchema,
};
