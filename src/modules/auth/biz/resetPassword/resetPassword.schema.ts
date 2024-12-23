import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

export const resetPasswordBodySchema = z
  .object({
    otp: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const resetPasswordBodyJsonSchema = zodToJsonSchema(resetPasswordBodySchema, {
  name: "resetPasswordBodyJsonSchema",
})?.definitions?.resetPasswordBodyJsonSchema;

export const resetPasswordSchema = {
  tags: ["auth"],
  description: "Reset password",
  body: resetPasswordBodyJsonSchema,
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
