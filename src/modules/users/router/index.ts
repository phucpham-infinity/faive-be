import { FastifyInstance } from "fastify";
import * as usersBiz from "../biz";

export default async function (fastify: FastifyInstance) {
  fastify.route({
    method: "GET",
    url: "/",
    preValidation: [fastify.authenticate],
    schema: usersBiz.getUserByIdSchema,
    handler: usersBiz.getUserById,
  });
}
