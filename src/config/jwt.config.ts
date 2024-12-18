import { FastifyInstance } from "fastify";

export default (app: FastifyInstance) =>( {
 secret: app.config.JWT_SECRET,
});
