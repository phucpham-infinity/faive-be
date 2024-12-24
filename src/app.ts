import fastify from "fastify";
import fastifyEnv from "@fastify/env";
import fastifyCors from "@fastify/cors";
import fastifyCompress from "@fastify/compress";
import fastifyHelmet from "@fastify/helmet";
import fastifyRedis from "@fastify/redis";
import fastifyJwt from "@fastify/jwt";
import fastifySensible from "@fastify/sensible";

import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

import envConfig from "./config/env.config";
import corsConfig from "./config/cors.config";
import loggerConfig from "./config/logger.config";
import compressConfig from "./config/compress.config";
import helmetConfig from "./config/helmet.config";
import redisConfig from "./config/redis.config";
import jwtConfig from "./config/jwt.config";
import bullConfig from "./config/bull.config";

import { swaggerConfig } from "./config/swagger.config";

import { productsRoutes, productSchema } from "./modules/products";
import { authRoutes } from "./modules/auth";
import { usersRoutes } from "./modules/users";

import {
  messageSchema,
  paramIdSchema,
  paginationSchema,
} from "./common/schema";

import { bearerTokenVerify, replyOk200 } from "./common/decorate";

import { connect } from "./common/lib/mongo.db";

const main = async () => {
  const app = fastify({ logger: loggerConfig });

  // Now we setup our app, plugins and such
  await app.register(fastifyEnv, envConfig);
  await app.register(fastifyCors, corsConfig);
  await app.register(fastifyCompress, compressConfig);
  await app.register(fastifyHelmet, helmetConfig);
  await app.register(fastifyRedis, redisConfig(app));
  await app.register(fastifyJwt, jwtConfig(app));
  await app.register(fastifySensible);
  await app.register(bullConfig(app).registerPlugin() as any, {
    prefix: "/queues",
  });

  // Connect to MongoDB
  await connect(app.config.DATABASE_URL);

  // Json Schemas
  app.addSchema(paginationSchema);
  app.addSchema(paramIdSchema);
  app.addSchema(messageSchema);

  app.addSchema(productSchema);

  // Swagger Docs
  if (app.config.ENABLE_SWAGGER) {
    await app.register(fastifySwagger, swaggerConfig);
    await app.register(fastifySwaggerUi, {
      routePrefix: "/docs",
    });
  }

  // Middleware
  bearerTokenVerify(app);
  replyOk200(app);

  // API Endpoint routes
  await app.register(
    async (api) => {
      api.register(productsRoutes, { prefix: "/products" });
      api.register(authRoutes, { prefix: "/auth" });
      api.register(usersRoutes, { prefix: "/user" });
    },
    { prefix: "/api/v1" }
  );

  return app;
};

export { main };
