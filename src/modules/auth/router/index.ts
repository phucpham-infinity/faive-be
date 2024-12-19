import { FastifyInstance } from "fastify";
import * as authBiz from "../biz";

export default async function (fastify: FastifyInstance) {
  fastify.route({
    method: "POST",
    url: "/login",
    schema: authBiz.loginSchema,
    handler: authBiz.createProduct,
  });

  fastify.route({
    method: "POST",
    url: "/register",
    schema: authBiz.registerSchema,
    handler: authBiz.registerUser,
  });
}
