export const getUserFaivelistSchema = {
  tags: ["taxonomyTerm"],
  description: "Get user faivelist",
  querystring: {
    type: "object",
    properties: {
      q: { type: "string", description: "Search query" },
      sort: { type: "string", description: "Sort order (e.g., asc or desc)" },
      user: { type: "string", description: "User ID or username" },
    },
    required: [],
  },
  security: [{ bearerAuth: [] }],
};
