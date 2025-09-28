import nodemailer from 'nodemailer';
import { config } from '../configs/app.js';

export const mailTransport = nodemailer.createTransport({
  host: config.email.smtp,
  port: 587,
  secure: false,
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});
