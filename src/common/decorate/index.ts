import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export enum MIDDLEWARE {
  AUTHENTICATE = "authenticate",
  OK200 = "ok200",
}

export const bearerTokenVerify = (fastify: FastifyInstance) =>
  fastify.decorate(
    MIDDLEWARE.AUTHENTICATE,
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const payload = await request.jwtVerify();
        request.currentUser = payload as any;
      } catch (err: any) {
        reply.unauthorized(err.message ?? "JWT verify error.");
      }
    }
  );

export const replyOk200 = (fastify: FastifyInstance) =>
  fastify.decorateReply(MIDDLEWARE.OK200, function (data: any, meta?: any) {
    this.status(200).send({
      status: "Success",
      ...data,
      meta: meta || null,
    });
  });
