import { FastifyInstance } from "fastify";
import * as taxonomyTermBiz from "../biz";

export default async function (fastify: FastifyInstance) {
  fastify.route({
    method: "GET",
    url: "/",
    preValidation: [fastify.authenticate],
    schema: taxonomyTermBiz.getUserFaivelistSchema,
    handler: taxonomyTermBiz.getUserFaivelist,
  });
  fastify.route({
    method: "POST",
    url: "/create",
    preValidation: [fastify.authenticate],
    schema: taxonomyTermBiz.addTaxonomyTermSchema,
    handler: taxonomyTermBiz.addTaxonomyTerm,
  });
  fastify.route({
    method: "PATCH",
    url: "/edit/:id",
    preValidation: [fastify.authenticate],
    schema: taxonomyTermBiz.updateFaiveListSchema,
    handler: taxonomyTermBiz.updateFaiveList,
  });
  fastify.route({
    method: "DELETE",
    url: "/delete/:id",
    preValidation: [fastify.authenticate],
    schema: taxonomyTermBiz.deleteFaiveListSchema,
    handler: taxonomyTermBiz.deleteFaiveList,
  });
  fastify.route({
    method: "GET",
    url: "/:id",
    preValidation: [fastify.authenticate],
    schema: taxonomyTermBiz.getFaiveListSchema,
    handler: taxonomyTermBiz.getFaiveList,
  });
}
