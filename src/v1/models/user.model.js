import mongoose from 'mongoose';

const roles = ['user', 'admin', 'sub-admin'];

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
		trim: true,
	},
	role: {
		type: String,
		enum: roles,
		default: 'user',
	},
	newsletter: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export const User = mongoose.model('User', userSchema);
export { roles };
