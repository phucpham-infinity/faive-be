import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const loginUserBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const loginUserBodyJsonSchema = zodToJsonSchema(loginUserBodySchema, {
  name: "loginUserBodyJsonSchema",
})?.definitions?.loginUserBodyJsonSchema;

export const loginSchema = {
  tags: ["auth"],
  description: "Login user",
  body: loginUserBodyJsonSchema,
  response: {
    200: {
      body: {
        type: "object",
        properties: {
          _id: { type: "string" },
          email: { type: "string" },
          token: { type: "string" },
        },
      },
    },
    404: { $ref: "messageResponseSchema#" },
  },
};
