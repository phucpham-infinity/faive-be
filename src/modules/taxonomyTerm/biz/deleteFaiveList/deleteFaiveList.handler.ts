import { FastifyReply, FastifyRequest } from "fastify";

import { asyncHandler } from "@/common/helper";
import { TaxonomyTerm } from "@/modules/taxonomyTerm/model";
import { ProductsUsers } from "@/modules/productsUsers";

export async function deleteFaiveList(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const { id: user } = request.currentUser ?? {};
  const { id } = request.params;

  const [faiveList, error] = await asyncHandler(() =>
    TaxonomyTerm.findOne({ user, _id: id })
  );
  if (error) return reply.badGateway(error.message);

  if (!faiveList) return reply.notFound("Faive list not found");

  const [_, error1] = await asyncHandler(() =>
    ProductsUsers.deleteMany({ faiveList: id })
  );
  if (error1) return reply.badGateway(error1.message);
  const [__, error2] = await asyncHandler(() =>
    TaxonomyTerm.findByIdAndDelete(id)
  );
  if (error2) return reply.badGateway(error2.message);
  return reply.ok200();
}
