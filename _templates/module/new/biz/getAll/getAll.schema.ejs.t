---
to: src/modules/<%= nameCamelCase %>/getAll/getAll.schema.ts
---
export const get<%= namePascalCase %>AllSchema = {
  tags: ["<%= nameCamelCase %>"],
  description: "Get all",
  security: [{ bearerAuth: [] }],
};
