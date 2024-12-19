export const loginSchema = {
  tags: ["auth"],
  description: "Login user",
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
          _id: { type: "string" },
          email: { type: "string" },
          token: { type: "string" },
        },
      },
    },
    404: { $ref: "messageResponseSchema#" },
  },
};
