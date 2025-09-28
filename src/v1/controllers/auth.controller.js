import { signup, login } from '../services/auth.service.js';

export const signupController = async (req, res) => {
	try {
		const { email, password, name, role, newsletter } = req.body;
		const user = await signup({ email, password, name, role, newsletter });
		res.status(201).json({ message: 'Signup successful', user: { email: user.email, name: user.name, role: user.role, newsletter: user.newsletter } });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

export const loginController = async (req, res) => {
	try {
		const { email, password } = req.body;
		const { user, token } = await login({ email, password });
		res.json({ token, user: { email: user.email, name: user.name, role: user.role, newsletter: user.newsletter } });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};
