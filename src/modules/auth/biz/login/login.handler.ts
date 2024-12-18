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
  if (error) return reply.badGateway(error.message);
  if (!user) return reply.notFound("User not found");

  const [isPasswordCorrect, error2] = await asyncHandler(() =>
    user.checkPassword(password, user.password)
  );

  if (error2) return reply.badGateway(error2.message);
  if (!isPasswordCorrect) return reply.badRequest("Password is incorrect");

  const accessToken = await reply.jwtSign({ id: user._id, email: user.email });
  return reply.ok200({ accessToken, tokenType: "bearer" });
}
