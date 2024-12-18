import { FastifyInstance } from "fastify";

export default (app: FastifyInstance) =>( {
  forceClose: true,
  url: app.config.DATABASE_URL,
});
