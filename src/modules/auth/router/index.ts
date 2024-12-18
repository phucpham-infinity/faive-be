import { FastifyInstance } from "fastify";
import * as authBiz from "../biz";

export default async function (fastify: FastifyInstance) {
   fastify.route({
     method: "POST",
     url: "/",
     schema: authBiz.loginSchema,
     handler: authBiz.createProduct,
   });
 
}
