export const getUserByIdSchema = {
  tags: ["users"],
  description: "Get user by id",
  security: [{ bearerAuth: [] }],
  // response: {
  //   200: {
  //     type: "object",
  //     properties: {
  //       userProfile: { type: "object" },
  //       user: { type: "object" },
  //     },
  //   },
  //   404: { $ref: "messageResponseSchema#" },
  // },
};
