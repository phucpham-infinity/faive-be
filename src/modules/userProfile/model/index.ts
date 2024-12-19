import mongoose, { Schema, Document } from "mongoose";

export interface IUserProfile extends Document {
  user: mongoose.Types.ObjectId;
  image: string | null;
  cover_image: string | null;
  username: string | null;
  instagram_user: string | null;
  tiktok_user: string | null;
  bio: string | null;
  status: "public" | "private";
  created_at: Date;
  updated_at: Date;
  delete_at: Date;
}

const userProfileSchema: Schema<IUserProfile> = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: {
    type: String,
    default: null,
  },
  cover_image: {
    type: String,
    default: null,
  },
  username: {
    type: String,
    default: null,
  },
  instagram_user: {
    type: String,
    default: null,
  },
  tiktok_user: {
    type: String,
    default: null,
  },
  bio: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    enum: ["public", "private"],
    default: "public",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
  delete_at: {
    type: Date,
  },
});

export const UserProfile = mongoose.model<IUserProfile>(
  "UserProfile",
  userProfileSchema
);
