export const swaggerConfig: any = {
  openapi: {
    openapi: "3.0.0",
    info: {
      title: "RESTful APIs using Fastify",
      description: "CRUDs using Swagger, Fastify and Prisma",
      version: "0.0.1",
    },
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here",
    },
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          description:'Login to get JWT authorization',
          bearerFormat: 'JWT',
        }
      }
    },
    tags: [
      { name: "categories", description: "Category related end-points" },
      { name: "products", description: "Product related end-points" },
    ],
  },
};
