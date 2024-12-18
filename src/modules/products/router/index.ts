import { FastifyInstance } from "fastify";

import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../handler";
import {
  getAllSchema,
  getSchema,
  deleteSchema,
  createSchema,
  updateSchema,
} from "../schema";

export default async function (fastify: FastifyInstance) {
   // List all products, paginated
  fastify.route({
    method: "GET",
    url: "/",
    preValidation: [fastify.authenticate],
    schema: getAllSchema,
    handler: getProducts,
  });

  // Get one product
  fastify.get("/:id", { schema: getSchema }, getProduct);

  // Deleteing a Product
  fastify.delete("/:id", { schema: deleteSchema }, deleteProduct);

  // Create a new Product
  fastify.post("/", { schema: createSchema }, createProduct);

  // Update an existing Category
  fastify.put("/:id", { schema: updateSchema }, updateProduct);
}
