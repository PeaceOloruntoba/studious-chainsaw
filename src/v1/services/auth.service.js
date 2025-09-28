import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, roles } from '../models/user.model.js';
import { env } from '../../configs/env.js';

export const signup = async ({ email, password, name, role = 'user', newsletter = false }) => {
	if (!roles.includes(role)) role = 'user';
	const existing = await User.findOne({ email });
	if (existing) throw new Error('Email already registered');
	const hash = await bcrypt.hash(password, 10);
	const user = await User.create({ email, password: hash, name, role, newsletter });
	return user;
};

export const login = async ({ email, password }) => {
	const user = await User.findOne({ email });
	if (!user) throw new Error('Invalid credentials');
	const match = await bcrypt.compare(password, user.password);
	if (!match) throw new Error('Invalid credentials');
	const token = jwt.sign({ id: user._id, role: user.role }, env.JWT_SECRET, { expiresIn: '7d' });
	return { user, token };
};
