import { FastifyReply, FastifyRequest } from "fastify";
import { asyncHandler } from "@/common/helper";
import { User } from "@/modules/auth/model";
import { UserProfile } from "@/modules/userProfile/model";

export async function registerUser(
  request: FastifyRequest<{
    Body: {
      email: string;
      password: string;
      first_name: string;
      last_name: string;
      confirmPassword: string;
    };
  }>,
  reply: FastifyReply
) {
  const { email, password, first_name, last_name, confirmPassword } =
    request.body;

  if (password !== confirmPassword) {
    return reply.badRequest("Passwords do not match");
  }
  const [user, error] = await asyncHandler(() =>
    User.create({
      email,
      password,
      first_name,
      last_name,
      confirm_password: confirmPassword,
    })
  );
  if (error) return reply.badGateway(error.message);
  if (!user) return reply.notFound("User not found");

  const [userProfile, error2] = await asyncHandler(() =>
    UserProfile.create({ user: user._id })
  );
  if (error2) {
    await User.findByIdAndDelete(user._id);
    return reply.badGateway(error2.message);
  }

  const token = await reply.jwtSign({ id: user._id, email: user.email });
  return reply.ok200({
    _id: user._id,
    email: user.email,
    token,
    _userProfile: userProfile,
  });
}
