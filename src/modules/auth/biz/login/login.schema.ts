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
    200: { $ref: "messageResponseSchema#" },
    404: { $ref: "messageResponseSchema#" },
  },
};
