import { Schema, Document, model } from 'mongoose';

export interface ThemeDocument extends Document {
  name: string;
  url?: string;
  permissions: {
    images: boolean;
    videos: boolean;
    text: boolean;
  };
}

const themesSchema = new Schema<ThemeDocument>({
  name: { type: String, required: true, unique: true },
  url: { type: String, },
  permissions: {
    images: { type: Boolean, default: false },
    videos: { type: Boolean, default: false },
    text: { type: Boolean, default: false },
  },
});

export default model<ThemeDocument>('themes', themesSchema);
