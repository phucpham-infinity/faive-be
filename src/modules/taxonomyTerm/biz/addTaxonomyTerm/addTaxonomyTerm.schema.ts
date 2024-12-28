import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

export const addTaxonomyTermBodySchema = z.object({
  name: z.string().min(2),
});

export const addTaxonomyTermSchema = {
  tags: ["taxonomyTerm"],
  description: "Add taxonomy term",
  security: [{ bearerAuth: [] }],
  body: zodToJsonSchema(addTaxonomyTermBodySchema, {
    name: "addTaxonomyTermBodySchema",
  })?.definitions?.addTaxonomyTermBodySchema,
};
