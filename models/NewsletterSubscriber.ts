import { Schema, models, model } from 'mongoose';

const NewsletterSubscriberSchema = new Schema(
  {
    email: { type: String, unique: true, required: true, lowercase: true, index: true },
    name: { type: String },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export type NewsletterSubscriberDoc = {
  _id: string;
  email: string;
  name?: string;
  active?: boolean;
};

export default models.NewsletterSubscriber || model('NewsletterSubscriber', NewsletterSubscriberSchema);
