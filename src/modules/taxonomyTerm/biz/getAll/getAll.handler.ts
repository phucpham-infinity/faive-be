import { FastifyReply, FastifyRequest } from "fastify";
import { asyncHandler } from "@/common/helper";
import { TaxonomyTerm } from "@/modules/taxonomyTerm/model";

export async function getAllTaxonomyTerm(
  request: FastifyRequest<{Body: any }>,
  reply: FastifyReply
) {
  const [data, error] = await asyncHandler(() =>TaxonomyTerm.find());
  if (error) return reply.badGateway(error.message);
  if (!data) return reply.notFound(" TaxonomyTerm not found");
  return reply.ok200({ data });
}
