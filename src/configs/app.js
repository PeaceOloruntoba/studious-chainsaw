export const config = {
  jwt: {
    secret: process.env.JWT_SECRET || 'your_jwt_secret',
    expiresIn: '7d',
  },
  email: {
    from: process.env.EMAIL_FROM || 'noreply@blog.com',
    smtp: process.env.SMTP_SERVER || '',
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
  // Add more config sections as needed
};
