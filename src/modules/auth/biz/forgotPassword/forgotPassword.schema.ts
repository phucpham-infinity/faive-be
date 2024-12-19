import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

export const forgotPasswordBodySchema = z.object({
  email: z.string().email(),
});

const forgotPasswordBodyJsonSchema = zodToJsonSchema(forgotPasswordBodySchema, {
  name: "forgotPasswordBodyJsonSchema",
})?.definitions?.forgotPasswordBodyJsonSchema;

export const forgotPasswordSchema = {
  tags: ["auth"],
  description: "Forgot password",
  body: forgotPasswordBodyJsonSchema,
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
