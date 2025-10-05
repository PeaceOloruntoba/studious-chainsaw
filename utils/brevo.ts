import * as SibApiV3Sdk from 'sib-api-v3-typescript';

const apiKey = process.env.BREVO_API_KEY;

if (!apiKey) {
  console.warn('BREVO_API_KEY not set');
}

export const brevo = new SibApiV3Sdk.TransactionalEmailsApi();
export const contacts = new SibApiV3Sdk.ContactsApi();

brevo.setApiKey('api-key', apiKey || '');
contacts.setApiKey('api-key', apiKey || '');

export function getSender() {
  const email = process.env.BREVO_SENDER_EMAIL || 'no-reply@example.com';
  const name = process.env.BREVO_SENDER_NAME || 'Brand';
  return { email, name };
}
