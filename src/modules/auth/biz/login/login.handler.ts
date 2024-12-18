import { FastifyReply, FastifyRequest } from "fastify";

export async function createProduct(
  request: FastifyRequest<PostProduct>,
  reply: FastifyReply
) {
  const { name, price, published, categoryId } = request.body;
  return reply.status(201).send({ name, price, published, categoryId });
}
