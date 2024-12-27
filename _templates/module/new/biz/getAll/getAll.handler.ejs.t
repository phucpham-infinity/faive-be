---
to: src/modules/<%= nameCamelCase %>/biz/getAll/getAll.handler.ts
---
import { FastifyReply, FastifyRequest } from "fastify";
import { asyncHandler } from "@/common/helper";
import { <%= namePascalCase %> } from "@/modules/<%= nameCamelCase %>/model";

export async function getAll<%= namePascalCase %>(
  request: FastifyRequest<{Body: any }>,
  reply: FastifyReply
) {
  const [data, error] = await asyncHandler(() =><%= namePascalCase %>.find());
  if (error) return reply.badGateway(error.message);
  if (!data) return reply.notFound(" <%= namePascalCase %> not found");
  return reply.ok200({ data });
}
