import { Instrument_Serif } from 'next/font/google';

// Editorial serif italic for first-person quotes (manifesto, pull-quotes).
// 2026 design pattern — used by Vercel, Linear, Anthropic, Stripe for
// authored citations. Self-hosted via next/font/google: no CLS, GDPR-safe.
export const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  display: 'swap',
});

// Same family in regular (non-italic) for hero display copy. Same DNA as
// the manifesto italic — coherent typographic voice — but visually
// differentiated so the cita keeps its uniqueness.
export const instrumentSerifRegular = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: 'normal',
  display: 'swap',
});
