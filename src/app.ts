import fastify from "fastify";
import fastifyEnv from "@fastify/env";
import fastifyCors from "@fastify/cors";
import fastifyCompress from "@fastify/compress";
import fastifyHelmet from "@fastify/helmet";
import fastifyMongodb from "@fastify/mongodb";
import fastifyRedis from "@fastify/redis";
import fastifyJwt from "@fastify/jwt";
import fastifySensible from "@fastify/sensible";

import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

import envConfig from "./lib/env.config";
import corsConfig from "./config/cors.config";
import loggerConfig from "./config/logger.config";
import compressConfig from "./config/compress.config";
import helmetConfig from "./config/helmet.config";
import mongodbConfig from "./config/mongodb.config";
import redisConfig from "./config/redis.config";
import redisJwt from "./config/jwt.config";

import { swaggerConfig } from "./config/swagger.config";

import { productsRoutes, productSchema } from "./modules/products";
import { authRoutes } from "./modules/auth";
import {
  messageSchema,
  paramIdSchema,
  paginationSchema,
} from "./common/schema";

import { bearerTokenVerify } from "./common/middleware";

const main = async () => {
  const app = fastify({ logger: loggerConfig });

  // Now we setup our app, plugins and such
  await app.register(fastifyEnv, envConfig);
  await app.register(fastifyCors, corsConfig);
  await app.register(fastifyCompress, compressConfig);
  await app.register(fastifyHelmet, helmetConfig);
  await app.register(fastifyMongodb, mongodbConfig(app));
  await app.register(fastifyRedis, redisConfig(app));
  await app.register(fastifyJwt, redisJwt(app));
  await app.register(fastifySensible);

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
  bearerTokenVerify(app)

  // API Endpoint routes
  await app.register(
    async (api) => {
      api.register(productsRoutes, { prefix: "/products" });
      api.register(authRoutes, { prefix: "/auth" });
    },
    { prefix: "/api/v1" }
  );

  return app;
};

export { main };
