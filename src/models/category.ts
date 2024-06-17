import { Schema, Document, model } from 'mongoose';

export interface CategoryDocument extends Document {
  name: string;
}

const CategorySchema = new Schema<CategoryDocument>({
  name: { type: String, required: true, unique: true },
});

export default model<CategoryDocument>('categories', CategorySchema);
