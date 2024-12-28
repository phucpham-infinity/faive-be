export const deleteFaiveListSchema = {
  tags: ["taxonomyTerm"],
  description: "Delete taxonomy term",
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
  },
  security: [{ bearerAuth: [] }],
};
