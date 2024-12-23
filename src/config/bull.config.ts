import { Queue as QueueMQ, ConnectionOptions } from "bullmq";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { createBullBoard } from "@bull-board/api";
import { FastifyInstance } from "fastify";
import { FastifyAdapter } from "@bull-board/fastify";
import { EMAIL_QUEUE } from "@/modules/email";
import { setupEmailWorker } from "@/modules/email/worker";

const createQueueMQ = (name: string, connection: ConnectionOptions): QueueMQ =>
  new QueueMQ(name, { connection });

const readQueuesFromEnv = (qStr: string): string[] => {
  try {
    const qs = qStr.split(",");
    return qs.map((q) => q.trim());
  } catch (e) {
    return [];
  }
};

const init = (fastify: FastifyInstance) => {
  const redisConfig = {
    port: +(fastify.config.REDIS_PORT ?? 6379),
    host: fastify.config.REDIS_HOST,
    password: fastify.config.REDIS_PASSWORD,
    username: fastify.config.REDIS_USERNAME,
  };
  const queues = readQueuesFromEnv(fastify.config.BULL_QUEUE_NAMES_CSV).map(
    (q) => createQueueMQ(q, redisConfig)
  );

  queues.forEach((q) => {
    switch (q.name) {
      case EMAIL_QUEUE:
        setupEmailWorker(redisConfig);
        break;
      default:
        break;
    }
  });

  const serverAdapter = new FastifyAdapter();

  createBullBoard({
    queues: queues.map((q) => new BullMQAdapter(q)),
    serverAdapter,
  });

  const getQueueByName = (name: string) => {
    return queues.find((q) => q.name === name);
  };

  fastify.addHook("onRequest", async (request, reply) => {
    request.queues = queues;
    request.getQueue = getQueueByName;
  });

  serverAdapter.setBasePath("/queues");
  return serverAdapter;
};

export default init;
