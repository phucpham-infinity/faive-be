// POST '/'
export const createSchema = {
  tags: ["products"],
  description: "Creates a new Product",
  body: {
    type: "object",
    required: ["name", "price", "categoryId"],
    properties: {
      name: { type: "string" },
      price: { type: "number" },
      published: { type: "boolean", default: true },
      categoryId: { type: "string", pattern: "^[0-9a-fA-F]{24}$" },
    },
  },
  response: {
    200: { $ref: "productSchema#" },
    404: { $ref: "messageResponseSchema#" },
  },
};
