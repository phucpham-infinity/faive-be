import { FastifyInstance } from "fastify";

export default (app: FastifyInstance) => ({
  url: app.config.DATABASE_URL,
});
