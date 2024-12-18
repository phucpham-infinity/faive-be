import { FastifyInstance } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      JWT_SECRET: string;
      NODE_ENV: 'development' | 'production' | 'test';
      BIND_PORT: number;
      BIND_ADDR: string;
      PROJECT_NAME: string;
      APP_SERVER_NAME: string;
      DATABASE_URL: string;
      ENABLE_SWAGGER: boolean;
      REDIS_HOST: string;
      REDIS_PORT: number;
    };
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }

  interface FastifyRequest {
    user: {
      id: string;
      role: string;
    };
  }
}
