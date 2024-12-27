import { asyncHandler } from "@/common/helper";
import { minioClient } from "@/common/lib/minio.store";
import { UserProfile } from "@/modules/userProfile/model";
import { FastifyReply, FastifyRequest } from "fastify";

export async function updateProfileUrl(
  request: FastifyRequest<{ Body: { profile: any } }>,
  reply: FastifyReply
) {
  const { id } = request.currentUser ?? {};
  const uploadValue = await request.body?.profile?.toBuffer();
  const profile = request.body?.profile;

  const objectName = `${id}_${profile?.filename}`;

  const [_updated, error] = await asyncHandler(() =>
    minioClient.putObject(
      "faive",
      objectName,
      uploadValue,
      uploadValue?.length,
      {
        "Content-Type": profile?.mimetype,
      }
    )
  );
  if (error) return reply.badGateway(error.message);
  const imageUrl = `https://s3.ihomelap.io.vn/faive/${objectName}`;

  const [userProfile, error1] = await asyncHandler(() =>
    UserProfile.findOneAndUpdate(
      { user: id },
      { image: imageUrl },
      { new: true }
    )
  );
  if (error1) return reply.badGateway(error1.message);

  return reply.ok200({
    imageUrl,
    userProfile,
    message: "Image uploaded successfully",
  });
}
