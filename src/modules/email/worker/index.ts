import { Job, Worker } from "bullmq";
import { EMAIL_JOB, EMAIL_QUEUE } from "@/modules/email";
import { resetPasswordMail } from "../process/resetPassword.mail";

export const setupEmailWorker = (redisConfig: any) => {
  new Worker(
    EMAIL_QUEUE,
    async (job: Job) => {
      switch (job.name) {
        case EMAIL_JOB.SEND_FORGOT_PASSWORD_EMAIL:
          resetPasswordMail(job.data);
          break;

        default:
          break;
      }
    },
    { connection: redisConfig }
  );
};
