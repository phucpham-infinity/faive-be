import { FastifyInstance } from "fastify";

import { loginRouter } from "../biz/login/login.router";

export default async function (fastify: FastifyInstance) {
  // List all products, paginated
  loginRouter(fastify);
}
