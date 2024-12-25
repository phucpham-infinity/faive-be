import { FastifyInstance } from "fastify";
import * as usersBiz from "../biz";

export default async function (fastify: FastifyInstance) {
  fastify.route({
    method: "GET",
    url: "/get-user",
    preValidation: [fastify.authenticate],
    schema: usersBiz.getUserByIdSchema,
    handler: usersBiz.getUserById,
  });
  fastify.route({
    method: "PATCH",
    url: "/update-status",
    preValidation: [fastify.authenticate],
    schema: usersBiz.updateProfileStatusSchema,
    handler: usersBiz.updateProfileStatus,
  });
  fastify.route({
    method: "PATCH",
    url: "/update-profile",
    preValidation: [fastify.authenticate],
    schema: usersBiz.updateUserProfileSchema,
    handler: usersBiz.updateUserProfile,
  });
}