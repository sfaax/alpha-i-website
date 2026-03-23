import type { VercelRequest, VercelResponse } from '@vercel/node';

const RATE_LIMIT_WINDOW = 60_000;
const MAX_REQUESTS = 3;
const ipRequests = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipRequests.get(ip);
  if (!entry || now > entry.resetAt) {
    ipRequests.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }
  entry.count++;
  return entry.count > MAX_REQUESTS;
}

function sanitize(input: string): string {
  return input.replace(/[<>]/g, '').trim().slice(0, 1000);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const webhookUrl = process.env.WEBHOOK_CONTACT;
  if (!webhookUrl) {
    console.error('WEBHOOK_CONTACT not configured');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Trop de requêtes. Réessayez dans une minute.' });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Email invalide.' });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: sanitize(name),
        email: sanitize(email),
        message: sanitize(message),
        timestamp: new Date().toISOString(),
        source: 'alpha-i-website',
      }),
    });

    if (!response.ok) {
      throw new Error(`Webhook responded with ${response.status}`);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact webhook error:', error);
    return res.status(500).json({ error: 'Erreur lors de l\'envoi. Réessayez plus tard.' });
  }
}
