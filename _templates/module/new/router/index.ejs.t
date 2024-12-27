---
to: src/modules/<%= nameCamelCase %>/router/index.ts
---
import { FastifyInstance } from "fastify";
import * as <%= name %>Biz from "../biz";

export default async function (fastify: FastifyInstance) {
  fastify.route({
    method: "GET",
    url: "/all",
    schema: <%= name %>Biz.get<%= namePascalCase %>AllSchema,
    handler: <%= name %>Biz.getAll<%= namePascalCase %>,
  });
}
