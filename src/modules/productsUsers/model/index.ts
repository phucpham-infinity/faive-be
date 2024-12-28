import mongoose, { Document } from "mongoose";

interface IProductsUsers extends Document {
  product: mongoose.Schema.Types.ObjectId;
  site: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  faivelist: mongoose.Schema.Types.ObjectId;
  created_at: Date;
  updated_at: Date;
  delete_at: Date;
}

const productsUsersSchema = new mongoose.Schema<IProductsUsers>({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  site: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Site",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  faivelist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TaxonomyTerm",
    required: true,
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

export const ProductsUsers = mongoose.model<IProductsUsers>(
  "ProductsUsers",
  productsUsersSchema
);
