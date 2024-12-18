// GET '/'
export const getAllSchema = {
  querystring: { $ref: "paginationSchema" },
  tags: ["products"],
  description: "List all products, paginated using a cursor paginator.",
  response: {
    200: {
      type: "object",
      properties: {
        results: { type: "array", items: { $ref: "productSchema#" } },
      },
    },
    404: { $ref: "messageResponseSchema#" },
  },
};

// GET '/:id'
export const getSchema = {
  params: { $ref: "paramIdSchema" },
  tags: ["products"],
  description: "Get a single product and its category)",
  response: {
    200: { $ref: "productSchema#" },
    404: { $ref: "messageResponseSchema#" },
  },
};

// DELETE '/:id'
export const deleteSchema = {
  params: { $ref: "paramIdSchema" },
  tags: ["products"],
  description: "Removes an especific product from the collection",
  response: {
    200: { $ref: "messageResponseSchema#" },
    404: { $ref: "messageResponseSchema#" },
  },
};

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

// PUT: '/:id'
export const updateSchema = {
  tags: ["products"],
  description: "Updates a Product",
  params: { $ref: "paramIdSchema#" },
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

//Model Schema
export const productSchema = {
  $id: "productSchema",
  type: "object",
  // required: ['name', 'price', 'category'],
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    price: { type: "number" },
    published: { type: "boolean" },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: ["string", "null"], format: "date-time" },
  },
};
