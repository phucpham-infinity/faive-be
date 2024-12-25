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
      S3_BUCKET_NAME: {
        type: "string",
        default: "faive",
      },
      S3_ACCESS_KEY: {
        type: "string",
        default: "XXCnonT3wapzI3YYiWiJ",
      },
      S3_SECRET_ACCESS_KEY: {
        type: "string",
        default: "ld2GzR6qDd052GapcbSbQnWtV6j0PCJjn2TIpWmb",
      },
      S3_REGION: {
        type: "string",
        default: "us-east-1",
      },
      S3_ENDPOINT: {
        type: "string",
        default: "https://minio.ihomelap.io.vn",
      },
    },
  },
};

export default Config;
