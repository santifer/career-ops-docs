import { audienceId, resendClient, verifyConfirmToken } from '@/lib/email';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');

  if (!token) {
    return Response.redirect(new URL('/subscribed?status=invalid', url.origin), 303);
  }

  const verified = verifyConfirmToken(token);
  if (!verified) {
    return Response.redirect(new URL('/subscribed?status=invalid', url.origin), 303);
  }

  try {
    await resendClient().contacts.update({
      audienceId: audienceId(),
      email: verified.email,
      unsubscribed: false,
    });
    return Response.redirect(new URL('/subscribed?status=ok', url.origin), 303);
  } catch (err) {
    console.error('confirm update failed:', err);
    return Response.redirect(new URL('/subscribed?status=error', url.origin), 303);
  }
}
