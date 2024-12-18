import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export enum MIDDLEWARE {
  AUTHENTICATE = "authenticate",
}

export const bearerTokenVerify = (fastify: FastifyInstance) =>
  fastify.decorate(
    MIDDLEWARE.AUTHENTICATE,
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const payload = await request.jwtVerify();
        request.user = payload;
      } catch (err: any) {
        reply.unauthorized(err.message ?? "JWT verify error.");
      }
    }
  );
