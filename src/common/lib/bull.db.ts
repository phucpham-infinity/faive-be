import {
  Queue as QueueMQ,
  Worker,
  Job,
  QueueOptions,
  ConnectionOptions,
} from "bullmq";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { createBullBoard } from "@bull-board/api";
import { FastifyInstance } from "fastify";
import { FastifyAdapter } from "@bull-board/fastify";

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

export const initQueueMQ = async (fastify: FastifyInstance) => {
  const queues = readQueuesFromEnv(fastify.config.BULL_QUEUE_NAMES_CSV).map(
    (q) =>
      createQueueMQ(q, {
        port: +(fastify.config.REDIS_PORT ?? 6379),
        host: fastify.config.REDIS_HOST,
        password: fastify.config.REDIS_PASSWORD,
      })
  );
  const serverAdapter = new FastifyAdapter();

  createBullBoard({
    queues: queues.map((q) => new BullMQAdapter(q)),
    serverAdapter,
  });

  serverAdapter.setBasePath("/queues-ui");
  return serverAdapter;
};
