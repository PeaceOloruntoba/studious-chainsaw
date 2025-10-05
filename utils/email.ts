import nodemailer from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load email templates
const newsletterTemplatePath = join(__dirname, "..", "templates", "newsletterTemplate.html");
const newsletterTemplateSource = fs.readFileSync(newsletterTemplatePath, "utf8");
const newsletterTemplate = handlebars.compile(newsletterTemplateSource);

const sendEmail = async ({ to: string, subject: string, text: string, html: any, from: string }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      auth: {
        user: process.env.BREVO_EMAIL || process.env.BREVO_API_KEY,
        pass: process.env.BREVO_PASSWORD || process.env.BREVO_API_KEY,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: from || process.env.BREVO_SENDER_EMAIL || "peaceoloruntoba92@gmail.com",
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

const sendNewsletterEmail = async (email, userName, options = {}) => {
  const {
    subject = "Welcome to Our Newsletter!",
    brandName = "Brand Portfolio",
    message = "Thank you for subscribing to our newsletter. Stay tuned for amazing content!",
    ctaLink = null,
    isWelcome = true,
    showFeatures = true,
    socialLinks = [],
    unsubscribeLink = null
  } = options;

  const html = newsletterTemplate({
    userName,
    subject,
    brandName,
    message,
    ctaLink,
    isWelcome,
    showFeatures,
    socialLinks,
    unsubscribeLink
  });

  const text = `Hello${userName ? ` ${userName}` : ''}!\n\n${message}\n\nBest regards,\n${brandName} Team`;

  return sendEmail({
    to: email,
    subject,
    text,
    html,
  });
};

export default {
  sendEmail,
  sendNewsletterEmail,
};
