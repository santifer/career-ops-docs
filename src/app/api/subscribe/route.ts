import { z } from 'zod';
import {
  FROM_ADDRESS,
  REPLY_TO,
  audienceId,
  resendClient,
  signConfirmToken,
} from '@/lib/email';

export const runtime = 'nodejs';

const Body = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  hp: z.string().optional(), // honeypot — bots fill hidden fields
});

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }

  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return Response.json({ error: 'Invalid email' }, { status: 400 });
  }

  const { email, hp } = parsed.data;

  // Honeypot — bots see/fill hidden field; humans never do.
  // Pretend success to avoid leaking the trap.
  if (hp && hp.length > 0) {
    return Response.json({ ok: true });
  }

  const resend = resendClient();
  const aid = audienceId();

  // Add as unsubscribed=true (pending double opt-in). If contact already
  // exists, Resend returns the existing one — we re-send confirmation
  // either way. We never reveal subscription state to the client.
  try {
    await resend.contacts.create({
      audienceId: aid,
      email,
      unsubscribed: true,
    });
  } catch (err) {
    // Likely "already exists" — proceed to re-send confirmation.
    // Real failures are caught below by the email send.
    console.warn('contacts.create non-fatal:', err);
  }

  const origin = new URL(req.url).origin;
  const token = signConfirmToken(email);
  const confirmUrl = `${origin}/api/confirm?token=${encodeURIComponent(token)}`;
  // Always pointed at production: email clients can't reach localhost or
  // preview deploy URLs, and the "co" mark rarely changes — when it does,
  // deploy the new icon first and emails everywhere pick it up automatically.
  const logoUrl = 'https://career-ops.org/apple-icon';

  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      replyTo: REPLY_TO,
      subject: 'Confirm your subscription to career-ops',
      html: confirmEmailHtml(confirmUrl, logoUrl),
      text: confirmEmailText(confirmUrl),
    });
  } catch (err) {
    console.error('emails.send failed:', err);
    return Response.json({ error: 'Could not send confirmation email' }, { status: 502 });
  }

  return Response.json({ ok: true });
}

function confirmEmailHtml(url: string, logoUrl: string) {
  return `<!doctype html>
<html><body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #111; line-height: 1.5; max-width: 560px; margin: 0 auto; padding: 24px;">
<p>Hi,</p>
<p>Click the link below to confirm your subscription to career-ops release announcements.</p>
<p style="margin: 24px 0;"><a href="${url}" style="display: inline-block; background: #111; color: #fff; padding: 10px 18px; border-radius: 6px; text-decoration: none;">Confirm subscription</a></p>
<p style="font-size: 13px; color: #555;">Or paste this URL into your browser:<br><span style="word-break: break-all;">${url}</span></p>
<p style="font-size: 13px; color: #555;">If you didn't request this, no action needed — we won't email you again unless you confirm.</p>
<hr style="border: 0; border-top: 1px solid #eee; margin: 32px 0;">
<table cellpadding="0" cellspacing="0" border="0" role="presentation" style="font-size: 12px; color: #888;">
  <tr>
    <td style="vertical-align: middle; padding-right: 8px;">
      <a href="https://career-ops.org" style="text-decoration: none;">
        <img src="${logoUrl}" alt="career-ops" width="20" height="20" style="display: block; border-radius: 4px; border: 0;">
      </a>
    </td>
    <td style="vertical-align: middle;">
      <a href="https://career-ops.org" style="color: #888; text-decoration: none;">career-ops</a> · <a href="https://career-ops.org/privacy" style="color: #888;">Privacy</a>
    </td>
  </tr>
</table>
</body></html>`;
}

function confirmEmailText(url: string) {
  return [
    'Hi,',
    '',
    'Click to confirm your subscription to career-ops release announcements:',
    url,
    '',
    "If you didn't request this, no action needed.",
    '',
    'career-ops',
    'https://career-ops.org/privacy',
  ].join('\n');
}
