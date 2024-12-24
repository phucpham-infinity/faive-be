import z from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { asyncHandler } from "@/common/helper";
import { UserProfile } from "@/modules/userProfile/model";
import { updateProfileStatusBodySchema } from "./updateProfileStatus.schema";

export async function updateProfileStatus(
  request: FastifyRequest<{
    Body: z.infer<typeof updateProfileStatusBodySchema>;
  }>,
  reply: FastifyReply
) {
  const { id } = request.currentUser ?? {};
  const { status } = request.body;

  const [userProfile, error] = await asyncHandler(() =>
    UserProfile.findOneAndUpdate(
      { user: id },
      { status: status?.toLowerCase() },
      {
        new: true,
        runValidators: true,
      }
    )
  );
  if (error) return reply.badGateway(error.message);
  if (!userProfile) return reply.notFound("User not found");

  return reply.ok200({ userProfile });
}
