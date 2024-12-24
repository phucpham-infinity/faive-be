import z from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { asyncHandler } from "@/common/helper";
import { UserProfile } from "@/modules/userProfile/model";
import { updateUserProfileBodySchema } from "./updateUserProfile.schema";
import { User } from "@/modules/auth/model";

export async function updateUserProfile(
  request: FastifyRequest<{
    Body: z.infer<typeof updateUserProfileBodySchema>;
  }>,
  reply: FastifyReply
) {
  const { id } = request.currentUser ?? {};
  const {
    bio,
    email,
    first_name,
    instagram_user,
    last_name,
    password,
    tiktok_user,
    username,
  } = request.body;

  if (username) {
    const [userProfile, error] = await asyncHandler(() =>
      UserProfile.findOne({ username })
    );
    if (error) return reply.badGateway(error.message);
    if (!userProfile) return reply.notFound("User not found");
  }

  const [user, error1] = await asyncHandler(() =>
    User.findByIdAndUpdate(
      id,
      {
        email,
        password,
        first_name,
        last_name,
      },
      {
        new: true,
        runValidators: true,
      }
    )
  );

  if (error1) return reply.badGateway(error1.message);

  const [newUserProfile, error2] = await asyncHandler(() =>
    UserProfile.findOneAndUpdate(
      { user: id },
      {
        bio,
        instagram_user,
        tiktok_user,
      },
      {
        new: true,
        runValidators: true,
      }
    )
  );

  if (error2) return reply.badGateway(error2.message);

  return reply.ok200({ user, userProfile: newUserProfile });
}
