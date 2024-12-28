export const getFaiveListSchema = {
  tags: ["taxonomyTerm"],
  description: "Get all",
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
  },
  security: [{ bearerAuth: [] }],
};
