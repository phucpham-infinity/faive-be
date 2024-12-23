import z from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { asyncHandler } from "@/common/helper";
import { User } from "@/modules/auth/model";
import { forgotPasswordBodySchema } from "./forgotPassword.schema";
import { EMAIL_QUEUE, EMAIL_JOB } from "@/modules/email";

export async function forgotPassword(
  request: FastifyRequest<{ Body: z.infer<typeof forgotPasswordBodySchema> }>,
  reply: FastifyReply
) {
  const { email } = request.body;
  const [user, error] = await asyncHandler(() => User.findOne({ email }));
  if (error) return reply.badGateway(error.message);
  if (!user) return reply.notFound("User not found");

  const otp = user.createPasswordResetToken();
  const [_, error2] = await asyncHandler(() =>
    user.save({ validateBeforeSave: false })
  );

  if (error2) return reply.badGateway(error2.message);

  const emailQueue = request.getQueue(EMAIL_QUEUE);
  if (!emailQueue) return reply.badGateway("Email queue not found");

  await emailQueue.add(EMAIL_JOB.SEND_FORGOT_PASSWORD_EMAIL, {
    user: user.email,
    otp,
  });

  return reply.ok200({
    message: "An OTP has been sent to your email to reset your password.",
  });
}
