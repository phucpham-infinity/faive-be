import { FastifyReply, FastifyRequest } from "fastify";
import mongoose from "mongoose";

import { asyncHandler } from "@/common/helper";
import { TaxonomyTerm } from "@/modules/taxonomyTerm/model";
import { ProductsUsers } from "@/modules/productsUsers";

export async function getFaiveList(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const { id: user } = request.currentUser ?? {};
  const { id: _id } = request.params;

  const [faivelists, error] = await asyncHandler(() =>
    TaxonomyTerm.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(_id),
          user: new mongoose.Types.ObjectId(user),
        },
      },
      {
        $lookup: {
          from: "productsusers",
          localField: "_id",
          foreignField: "faivelist",
          as: "products",
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "products.product",
          foreignField: "_id",
          as: "products",
          pipeline: [
            {
              $sort: { updatedAt: -1 },
            },
            {
              $limit: 4,
            },
          ],
        },
      },
    ])
  );

  if (error) return reply.badGateway(error.message);

  if (!faivelists || faivelists.length === 0)
    return reply.notFound("Faivelist not found");

  const productsCount = await asyncHandler(() =>
    ProductsUsers.countDocuments({
      user,
      faivelist: _id,
    })
  );

  faivelists[0].images = faivelists[0].products
    .map((p: any) => p.image[0])
    .filter((i: any) => i);
  delete faivelists[0].products;

  return reply.ok200({ faivelist: { ...faivelists[0], productsCount } });
}
