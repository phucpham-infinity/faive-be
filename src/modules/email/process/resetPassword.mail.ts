import { resend } from "@/common/lib";

export const resetPasswordMail = async ({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) => {
  await resend.emails.send({
    from: "Acme <mail@mail.ihomelap.io.vn>",
    to: ["phuc.pxp@gmail.com"],
    subject: "hello world",
    html: `<p>it works! ${email} ${otp}</p>`,
  });
};
