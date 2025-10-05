import { Schema, models, model } from 'mongoose';

const UserSchema = new Schema(
  {
    email: { type: String, unique: true, required: true, lowercase: true, index: true },
    passwordHash: { type: String, required: true },
    name: { type: String }
  },
  { timestamps: true }
);

export type UserDoc = {
  _id: string;
  email: string;
  passwordHash: string;
  name?: string;
};

export default models.User || model('User', UserSchema);
