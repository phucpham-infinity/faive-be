---
to: src/modules/<%= nameCamelCase %>/biz/getAll/getAll.schema.ts
---
export const get<%= namePascalCase %>AllSchema = {
  tags: ["<%= nameCamelCase %>"],
  description: "Get all",
  security: [{ bearerAuth: [] }],
};
