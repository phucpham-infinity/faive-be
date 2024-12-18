import { FastifyReply, FastifyRequest } from "fastify";
import { User } from "../../model";
import { asyncHandler } from "@/common/helper";

export async function createProduct(
  request: FastifyRequest<{ Body: { email: string; password: string } }>,
  reply: FastifyReply
) {
  const { email, password } = request.body;
  const [user, error] = await asyncHandler(() =>
    User.findOne({ email }).select("+password")
  );
  if (error) reply.badGateway(error.message);
  if (!user) reply.notFound("User not found");
  return reply.ok200({ email, password });
}
