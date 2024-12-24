import { FastifyReply, FastifyRequest } from "fastify";
import { asyncHandler } from "@/common/helper";
import { User } from "@/modules/auth/model";
import { UserProfile } from "@/modules/userProfile/model";

export async function getUserById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.currentUser ?? {};

  const [user, error] = await asyncHandler(() => User.findById(id));
  if (error) return reply.badGateway(error.message);
  if (!user) return reply.notFound("User not found");
  const [userProfile, error1] = await asyncHandler(() =>
    UserProfile.findOne({ user: user._id })
  );
  if (error1) return reply.badGateway(error1.message);
  if (!userProfile) return reply.notFound("User profile not found");

  return reply.ok200({ userProfile, user });
}
