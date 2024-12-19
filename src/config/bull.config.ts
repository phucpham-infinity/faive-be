import { Queue as QueueMQ, ConnectionOptions, Job, Worker } from "bullmq";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { createBullBoard } from "@bull-board/api";
import { FastifyInstance } from "fastify";
import { FastifyAdapter } from "@bull-board/fastify";

const sleep = (t: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, t * 1000));

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

const setupBullMQProcessor = (
  queueName: string,
  connection: ConnectionOptions
) => {
  new Worker(
    queueName,
    async (job: Job) => {
      for (let i = 0; i <= 100; i++) {
        await sleep(Math.random());
        await job.updateProgress(i);
        await job.log(`Processing job at interval ${i}`);

        if (Math.random() * 200 < 1) throw new Error(`Random error ${i}`);
      }

      return { jobId: `This is the return value of job (${job.id})` };
    },
    { connection }
  );
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
    setupBullMQProcessor(q.name, redisConfig);
  });

  const serverAdapter = new FastifyAdapter();

  createBullBoard({
    queues: queues.map((q) => new BullMQAdapter(q)),
    serverAdapter,
  });

  serverAdapter.setBasePath("/queues");
  return serverAdapter;
};

export default init;
