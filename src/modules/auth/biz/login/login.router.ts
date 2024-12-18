import { FastifyInstance } from "fastify";
import { createSchema } from "./login.schema";
import { createProduct } from "./login.handler";

export const loginRouter = (fastify: FastifyInstance) =>
  fastify.route({
    method: "GET",
    url: "/",
    schema: createSchema,
    handler: createProduct,
  });
