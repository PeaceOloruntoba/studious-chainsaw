import jwt from 'jsonwebtoken';
import { env } from '../configs/env.js';
import { User } from '../v1/models/user.model.js';

// Auth middleware: verifies JWT and attaches user to req
export const authenticate = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(401).json({ message: 'No token provided' });
	}
	const token = authHeader.split(' ')[1];
	try {
		const decoded = jwt.verify(token, env.JWT_SECRET);
		req.user = await User.findById(decoded.id).select('-password');
		if (!req.user) return res.status(401).json({ message: 'User not found' });
		next();
	} catch (err) {
		return res.status(401).json({ message: 'Invalid token' });
	}
};

// Role-based access middleware
export const authorize = (...roles) => (req, res, next) => {
	if (!req.user || !roles.includes(req.user.role)) {
		return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
	}
	next();
};
