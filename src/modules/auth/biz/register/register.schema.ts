export const loginSchema = {
  tags: ["auth"],
  description: "Register user",
  body: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { type: "string" },
      password: { type: "string" },
    },
  },
  response: {
    200: {
      body: {
        type: "object",
        properties: {
          accessToken: { type: "string" },
          tokenType: { type: "string" },
        },
      },
    },
    404: { $ref: "messageResponseSchema#" },
  },
};
