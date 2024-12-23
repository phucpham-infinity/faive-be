import z from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { asyncHandler } from "@/common/helper";
import { User } from "@/modules/auth/model";
import { resetPasswordBodySchema } from "./resetPassword.schema";

export async function resetPassword(
  request: FastifyRequest<{ Body: z.infer<typeof resetPasswordBodySchema> }>,
  reply: FastifyReply
) {
  const { otp, email, password } = request.body;
  const [user, error] = await asyncHandler(() =>
    User.findOne({
      email,
      password_reset_token: otp,
      password_reset_expires: { $gt: Date.now() },
    })
  );
  if (error) return reply.badGateway(error.message);
  if (!user) return reply.notFound("User not found");

  user.password = password;
  user.password_reset_token = "";
  user.password_reset_expires = null;
  await user.save();

  return reply.ok200({
    message: "Password successfully updated. Login to get access!",
  });
}
