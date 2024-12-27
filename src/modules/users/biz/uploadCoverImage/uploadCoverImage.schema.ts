export const uploadCoverImageSchema = {
  tags: ["users"],
  description: "Update user profile url",
  security: [{ bearerAuth: [] }],
  consumes: ["multipart/form-data"],
  body: {
    type: "object",
    required: ["cover"],
    properties: {
      cover: {
        isFile: true,
        description: "Profile image file to upload",
      },
    },
  },
};
