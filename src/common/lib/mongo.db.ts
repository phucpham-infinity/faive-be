import mongoose from "mongoose";

export const connect = async (uri: string) => {
  try {
    await mongoose.connect(uri);
    console.log(`Database connection successfully with ${uri}`);
  } catch (err) {
    console.log(err);
  }
};
