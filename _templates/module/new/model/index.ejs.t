---
to: src/modules/<%= nameCamelCase %>/model/index.ts
---
import mongoose, { Document } from "mongoose";

interface I<%= namePascalCase %> extends Document {
  created_at: Date;
  updated_at: Date;
  delete_at: Date;
}

const <%= nameCamelCase %>Schema = new mongoose.Schema<I<%= namePascalCase %>>({
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

export const <%= namePascalCase %> = mongoose.model<I<%= namePascalCase %>>("<%= namePascalCase %>", <%= nameCamelCase %>Schema);
