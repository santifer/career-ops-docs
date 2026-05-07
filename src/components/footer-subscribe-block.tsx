'use client';

import { usePathname } from 'next/navigation';
import { SubscribeForm } from './subscribe-form';

// Hides the footer subscribe block on pages where it doesn't fit the
// reading context: the home page (form already integrated into the
// install CTA above), the legal /privacy page (asking for subscription
// inside a privacy doc reads off), and /subscribed (the user just
// confirmed — re-asking is noise).
const HIDDEN_PATHS = new Set(['/', '/privacy', '/subscribed']);

export function FooterSubscribeBlock() {
  const pathname = usePathname();
  if (HIDDEN_PATHS.has(pathname)) return null;

  return (
    <>
      <div className="py-8 md:py-10">
        <SubscribeForm />
      </div>
      <div className="border-t" />
    </>
  );
}
