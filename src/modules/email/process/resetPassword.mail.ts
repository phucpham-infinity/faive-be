import { resend } from "@/common/lib";
import { getTemplateString } from "../helpers";

export const resetPasswordMail = async ({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) => {
  const templateString = getTemplateString({
    template: "reset-password",
    vars: { email, otp },
  });

  await resend.emails.send({
    from: "Acme <mail@mail.ihomelap.io.vn>",
    to: ["phuc.pxp@gmail.com"],
    subject: "hello world",
    html: templateString,
    attachments: [
      {
        filename: "faive.png",
        path: "https://i.imgur.com/cI5XKrP.png",
      },
      {
        filename: "instagram.png",
        path: "https://i.imgur.com/PSkwGp2.png",
      },
      {
        filename: "tiktok.png",
        path: "https://i.imgur.com/1A8frLt.png",
      },
      {
        filename: "web.png",
        path: "https://i.imgur.com/cIcMswi.png",
      },
    ],
  });
};
