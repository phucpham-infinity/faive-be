import { FastifyInstance } from "fastify";
import * as taxonomyTermBiz from "../biz";

export default async function (fastify: FastifyInstance) {
  fastify.route({
    method: "GET",
    url: "/",
    schema: taxonomyTermBiz.getFaiveListSchema,
    handler: taxonomyTermBiz.getFaiveList,
  });
  fastify.route({
    method: "POST",
    url: "/create",
    schema: taxonomyTermBiz.addTaxonomyTermSchema,
    handler: taxonomyTermBiz.addTaxonomyTerm,
  });
  fastify.route({
    method: "PATCH",
    url: "/edit/:id",
    schema: taxonomyTermBiz.updateFaiveListSchema,
    handler: taxonomyTermBiz.updateFaiveList,
  });
  fastify.route({
    method: "DELETE",
    url: "/delete/:id",
    schema: taxonomyTermBiz.deleteFaiveListSchema,
    handler: taxonomyTermBiz.deleteFaiveList,
  });
  fastify.route({
    method: "GET",
    url: "/:id",
    schema: taxonomyTermBiz.getFaiveListSchema,
    handler: taxonomyTermBiz.getFaiveList,
  });
}
