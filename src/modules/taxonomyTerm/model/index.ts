import mongoose, { Document } from "mongoose";

interface ITaxonomyTerm extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
  url: string;
  status: "public" | "private";
  created_at: Date;
  updated_at: Date;
  delete_at: Date;
}

const taxonomyTermSchema = new mongoose.Schema<ITaxonomyTerm>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    unique: true,
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

taxonomyTermSchema.index({ name: 1 });

export const TaxonomyTerm = mongoose.model<ITaxonomyTerm>(
  "TaxonomyTerm",
  taxonomyTermSchema
);
