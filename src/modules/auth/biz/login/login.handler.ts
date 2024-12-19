import { FastifyReply, FastifyRequest } from "fastify";
import { asyncHandler } from "@/common/helper";
import { User } from "@/modules/auth/model";

export async function createProduct(
  request: FastifyRequest<{ Body: { email: string; password: string } }>,
  reply: FastifyReply
) {
  const { email, password } = request.body;
  const [user, error] = await asyncHandler(() =>
    User.findOne({ email }).select("+password")
  );
  if (error) return reply.badGateway(error.message);
  if (!user) return reply.notFound("User not found");

  const [isPasswordCorrect, error2] = await asyncHandler(() =>
    // @ts-ignore
    user.checkPassword(password, user.password)
  );

  if (error2) return reply.badGateway(error2.message);
  if (!isPasswordCorrect) return reply.badRequest("Password is incorrect");

  const token = await reply.jwtSign({ id: user._id, email: user.email });
  return reply.ok200({ _id: user._id, email: user.email, token });
}
