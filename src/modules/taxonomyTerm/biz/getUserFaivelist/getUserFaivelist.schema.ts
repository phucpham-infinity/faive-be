export const getUserFaivelistSchema = {
  tags: ["taxonomyTerm"],
  description: "Get user faivelist",
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
  },
  security: [{ bearerAuth: [] }],
};
