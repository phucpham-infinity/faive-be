const Config = {
  confKey: "config",
  schema: {
    type: "object",
    required: ["DATABASE_URL"],
    properties: {
      BIND_PORT: {
        type: "number",
        default: 5000,
      },
      BIND_ADDR: {
        type: "string",
        default: "127.0.0.1",
      },
      APP_SERVER_NAME: {
        type: "string",
        default: "localhost",
      },
      PROJECT_NAME: {
        type: "string",
        default: "fastify-rest",
      },
      DATABASE_URL: {
        type: "string",
        default: "mongodb://root:root123@45.149.207.141:27017/default",
      },
      REDIS_HOST: {
        type: "string",
        default: "45.149.207.141",
      },
      REDIS_PORT: {
        type: "number",
        default: 16379,
      },
      REDIS_PASSWORD: {
        type: "string",
        default: "api123",
      },
      REDIS_USERNAME: {
        type: "string",
        default: "api",
      },
      ENABLE_SWAGGER: {
        type: "boolean",
        default: true,
      },
      JWT_SECRET: {
        type: "string",
        default: "supersecret",
      },
      BULL_QUEUE_NAMES_CSV: {
        type: "string",
        default: "Example",
      },
    },
  },
};

export default Config;
