import { FastifyInstance } from "fastify";

export default (app: FastifyInstance) =>( {
  host: app.config.REDIS_HOST,
  port: app.config.REDIS_PORT,
});
