import z from "zod";
import uuid4 from "uuid4";

import { FastifyReply, FastifyRequest } from "fastify";
import { addTaxonomyTermBodySchema } from "./addTaxonomyTerm.schema";

import { asyncHandler } from "@/common/helper";
import { TaxonomyTerm } from "@/modules/taxonomyTerm/model";

export async function addTaxonomyTerm(
  request: FastifyRequest<{ Body: z.infer<typeof addTaxonomyTermBodySchema> }>,
  reply: FastifyReply
) {
  const { id: user } = request.currentUser ?? {};
  const { name } = request.body;

  const [faivelist, error] = await asyncHandler(() =>
    TaxonomyTerm.create({
      name,
      user,
      url: uuid4(),
    })
  );

  if (error) return reply.badGateway(error.message);
  if (!faivelist) return reply.badGateway("Faivelist not created");

  return reply.ok200({
    faivelist: { ...faivelist.toJSON(), images: [], productsCount: 0 },
  });
}
