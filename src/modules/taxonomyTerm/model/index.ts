import mongoose, { Document } from "mongoose";

interface ITaxonomyTerm extends Document {
  created_at: Date;
  updated_at: Date;
  delete_at: Date;
}

const taxonomyTermSchema = new mongoose.Schema<ITaxonomyTerm>({
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

export const TaxonomyTerm = mongoose.model<ITaxonomyTerm>("TaxonomyTerm", taxonomyTermSchema);
