import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

export const updateFaiveListBodySchema = z.object({
  name: z.string().min(2).optional(),
  status: z.string().optional(),
  url: z.string().optional(),
});
export const updateFaiveListSchema = {
  tags: ["taxonomyTerm"],
  description: "Update taxonomy term",
  security: [{ bearerAuth: [] }],
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
  },
  body: zodToJsonSchema(updateFaiveListBodySchema, {
    name: "updateFaiveListBodySchema",
  })?.definitions?.updateFaiveListBodySchema,
};
