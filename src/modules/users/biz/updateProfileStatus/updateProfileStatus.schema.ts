import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

export const updateProfileStatusBodySchema = z.object({
  status: z.string(),
});

const updateProfileStatusJsonSchema = zodToJsonSchema(
  updateProfileStatusBodySchema,
  {
    name: "updateProfileStatusJsonSchema",
  }
)?.definitions?.updateProfileStatusJsonSchema;

export const updateProfileStatusSchema = {
  tags: ["users"],
  description: "Get user by id",
  security: [{ bearerAuth: [] }],
  body: updateProfileStatusJsonSchema,
};
