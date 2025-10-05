import { TransactionalEmailsApi, ContactsApi } from '@getbrevo/brevo';

const apiKey = process.env.BREVO_API_KEY;

if (!apiKey) {
  console.warn('BREVO_API_KEY not set');
}

export const brevo = new TransactionalEmailsApi();
export const contacts = new ContactsApi();

// Set API key for authentication
brevo.authentications.apiKey.apiKey = apiKey || '';
contacts.authentications.apiKey.apiKey = apiKey || '';

export function getSender() {
  const email = process.env.BREVO_SENDER_EMAIL || 'no-reply@example.com';
  const name = process.env.BREVO_SENDER_NAME || 'Brand';
  return { email, name };
}
