import { Schema, Document, model } from 'mongoose';

export interface ContentDocument extends Document {
  title: string;
  theme: string; 
  category: string; 
  user: string;
  type: string;
  url?: string;
  text?: string;
  createdAt: Date;
}

const contentSchema = new Schema<ContentDocument>({
  title: { type: String, required: true },
  theme: { type: String, ref: 'themes', required: true }, 
  category: { type: String, ref: 'categories', required: true }, 
  user: { type: String, ref: 'users', required: true }, 
  type: { type: String, enum: ['text', 'images', 'videos'], required: true },
  url: { type: String },
  text: { type: String },
}, { timestamps: true });

export default model<ContentDocument>('contents', contentSchema);
