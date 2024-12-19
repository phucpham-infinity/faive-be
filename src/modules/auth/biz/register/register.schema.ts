export const registerSchema = {
  tags: ["auth"],
  description: "Register user",
  body: {
    type: "object",
    required: [
      "first_name",
      "last_name",
      "email",
      "password",
      "confirmPassword",
    ],
    properties: {
      first_name: { type: "string" },
      last_name: { type: "string" },
      email: { type: "string" },
      password: { type: "string" },
      confirmPassword: { type: "string" },
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
