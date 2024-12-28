import { FastifyReply, FastifyRequest } from "fastify";

import { asyncHandler } from "@/common/helper";
import { TaxonomyTerm } from "@/modules/taxonomyTerm/model";
import { ProductsUsers } from "@/modules/productsUsers";

export async function getUserFaivelist(
  request: FastifyRequest<{
    Params: { user: string };
    Querystring: { q: string; sort: string; user: string };
  }>,
  reply: FastifyReply
) {
  const { q, sort } = request.query;
  const user = request.query.user ?? request.currentUser?.id;

  let query: any = { user };
  if (q) {
    const reg = new RegExp(q, "i");
    console.log("Reg", reg);
    query = { ...query, name: reg };
  }

  let querySort: any = { updatedAt: -1 };

  if (sort) {
    const key = sort[0] === "-" ? sort.substring(1) : sort;
    delete querySort.updatedAt;
    querySort[key] = sort[0] === "-" ? -1 : 1;
  }

  const [faiveListsPre, error] = await asyncHandler(() =>
    TaxonomyTerm.aggregate([
      {
        $match: query,
      },
      {
        $sort: querySort,
      },
      {
        $lookup: {
          from: "productsusers",
          localField: "_id",
          foreignField: "faivelist",
          as: "images",
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "images.product",
          foreignField: "_id",
          as: "images",
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
  if (!faiveListsPre) return reply.notFound("Faivelist not found");

  const countProducts = await ProductsUsers.aggregate([
    {
      $match: query,
    },
    {
      $group: {
        _id: "$faivelist",
        count: { $sum: 1 },
      },
    },
  ]);

  const faivelists = faiveListsPre.map((el) => {
    const total = countProducts.filter(
      (list) => JSON.stringify(list._id) === JSON.stringify(el._id)
    );
    return {
      ...el,
      productsCount: total.length > 0 ? total?.[0].count : 0,
      images: el.images.map((x: any) => x.image[0]),
    };
  });

  return reply.ok200({ total: faivelists.length, faivelists });
}
