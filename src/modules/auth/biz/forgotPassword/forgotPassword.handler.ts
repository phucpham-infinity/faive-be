import { FastifyReply, FastifyRequest } from "fastify";
import { asyncHandler } from "@/common/helper";
import { User } from "@/modules/auth/model";
import z from "zod";
import { forgotPasswordBodySchema } from "./forgotPassword.schema";

export async function forgotPassword(
  request: FastifyRequest<{ Body: z.infer<typeof forgotPasswordBodySchema> }>,
  reply: FastifyReply
) {
  const { email } = request.body;
  const [user, error] = await asyncHandler(() => User.findOne({ email }));
  if (error) return reply.badGateway(error.message);
  if (!user) return reply.notFound("User not found");

  return reply.ok200({
    message: "An OTP has been sent to your email to reset your password.",
  });
}
