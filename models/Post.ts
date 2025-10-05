import { Schema, models, model, Types } from 'mongoose';

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    coverImageUrl: { type: String },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    readingTime: { type: Number, default: 0 }, // in minutes
    author: { type: Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

export type PostDoc = {
  _id: string;
  title: string;
  description: string;
  content: string;
  coverImageUrl?: string;
  slug?: string;
  status: 'draft' | 'published';
  readingTime: number;
  author?: string;
};

export default models.Post || model('Post', PostSchema);
