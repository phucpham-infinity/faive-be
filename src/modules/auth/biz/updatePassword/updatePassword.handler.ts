import z from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { asyncHandler } from "@/common/helper";
import { User } from "@/modules/auth/model";
import { updatePasswordBodySchema } from "./updatePassword.schema";

export async function updatePassword(
  request: FastifyRequest<{ Body: z.infer<typeof updatePasswordBodySchema> }>,
  reply: FastifyReply
) {
  const { password } = request.body;

  const [user, error] = await asyncHandler(() =>
    User.findOne({
      email: request.currentUser.email,
    })
  );
  if (error) return reply.badGateway(error.message);
  if (!user) return reply.notFound("User not found");

  user.password = password;
  await user.save();

  return reply.ok200({
    message: "Password successfully updated. Login to get access!",
  });
}
