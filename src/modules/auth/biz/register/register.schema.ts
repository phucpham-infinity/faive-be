import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

export const registerBodySchema = z
  .object({
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const registerBodyJsonSchema = zodToJsonSchema(registerBodySchema, {
  name: "RegisterBodySchema",
})?.definitions?.RegisterBodySchema;

export const registerSchema = {
  tags: ["auth"],
  description: "Register user",
  body: registerBodyJsonSchema,
  response: {
    200: {
      type: "object",
      properties: {
        _id: { type: "string" },
        email: { type: "string" },
        token: { type: "string" },
      },
    },
    404: { $ref: "messageResponseSchema#" },
  },
};
