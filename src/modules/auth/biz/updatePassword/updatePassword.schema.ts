import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

export const updatePasswordBodySchema = z
  .object({
    password: z.string().min(6),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const updatePasswordBodyJsonSchema = zodToJsonSchema(updatePasswordBodySchema, {
  name: "updatePasswordBodyJsonSchema",
})?.definitions?.updatePasswordBodyJsonSchema;

export const updatePasswordSchema = {
  tags: ["auth"],
  description: "Reset password",
  body: updatePasswordBodyJsonSchema,
  security: [{ bearerAuth: [] }],
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
    404: { $ref: "messageResponseSchema#" },
  },
};
