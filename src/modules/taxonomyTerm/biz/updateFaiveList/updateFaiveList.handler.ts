import z from "zod";

import { FastifyReply, FastifyRequest } from "fastify";
import { updateFaiveListBodySchema } from "./updateFaiveList.schema";

import { asyncHandler } from "@/common/helper";
import { TaxonomyTerm } from "@/modules/taxonomyTerm/model";

export async function updateFaiveList(
  request: FastifyRequest<{
    Body: z.infer<typeof updateFaiveListBodySchema>;
    Params: { id: string };
  }>,
  reply: FastifyReply
) {
  const { id } = request.params;
  const user = request.currentUser?.id;

  let [faivelist, error] = await asyncHandler(() =>
    TaxonomyTerm.findOneAndUpdate({ _id: id, user }, request.body, {
      new: true,
      runValidators: true,
    })
  );

  if (error) return reply.badGateway(error.message);

  if (!faivelist)
    return reply.notFound("Faive list not found or you are not authorized");

  return reply.ok200({
    faivelist,
  });
}
