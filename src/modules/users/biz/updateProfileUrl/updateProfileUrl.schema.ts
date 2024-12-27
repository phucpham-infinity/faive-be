export const updateProfileUrlSchema = {
  tags: ["users"],
  description: "Update user profile url",
  security: [{ bearerAuth: [] }],
  consumes: ["multipart/form-data"],
  body: {
    type: "object",
    required: ["profile"],
    properties: {
      profile: {
        isFile: true,
        description: "Profile image file to upload",
      },
    },
  },
};
