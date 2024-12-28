import { FastifyInstance } from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    config: {
      JWT_SECRET: string;
      NODE_ENV: "development" | "production" | "test";
      BIND_PORT: number;
      BIND_ADDR: string;
      PROJECT_NAME: string;
      APP_SERVER_NAME: string;
      DATABASE_URL: string;
      ENABLE_SWAGGER: boolean;
      REDIS_HOST: string;
      REDIS_PORT: number;
      REDIS_PASSWORD: string;
      BULL_QUEUE_NAMES_CSV: string;
      REDIS_USERNAME: string;
    };
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
  }

  interface FastifyRequest {
    currentUser: {
      id: string;
      role: string;
      email: string;
    };
    queues: QueueMQ[];
    getQueue: (name: string) => QueueMQ;
  }
  interface FastifyReply {
    ok200: (data?: any, meta?: any) => void;
  }
}
