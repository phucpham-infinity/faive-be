import { FastifyInstance } from "fastify";
import * as taxonomyTermBiz from "../biz";

export default async function (fastify: FastifyInstance) {
  fastify.route({
    method: "GET",
    url: "/all",
    schema: taxonomyTermBiz.getTaxonomyTermAllSchema,
    handler: taxonomyTermBiz.getAllTaxonomyTerm,
  });
}
