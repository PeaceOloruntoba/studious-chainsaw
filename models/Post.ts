import { Schema, models, model, Types } from 'mongoose';

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    coverImageUrl: { type: String },
    slug: { type: String, unique: true, index: true },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
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
  author?: string;
};

export default models.Post || model('Post', PostSchema);
