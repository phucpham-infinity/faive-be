import { FastifyInstance } from "fastify";
import * as authBiz from "../biz";

export default async function (fastify: FastifyInstance) {
  fastify.route({
    method: "POST",
    url: "/login",
    schema: authBiz.loginSchema,
    handler: authBiz.loginUser,
  });

  fastify.route({
    method: "POST",
    url: "/register",
    schema: authBiz.registerSchema,
    handler: authBiz.registerUser,
  });

  fastify.route({
    method: "POST",
    url: "/forgot-password",
    schema: authBiz.forgotPasswordSchema,
    handler: authBiz.forgotPassword,
  });

  fastify.route({
    method: "POST",
    url: "/reset-password",
    schema: authBiz.resetPasswordSchema,
    handler: authBiz.resetPassword,
  });
}
