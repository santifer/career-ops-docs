import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/jpeg';
export const alt = 'career-ops — You got the job. And it didn\'t cost you a thing.';

// OG image — hero banner from the core repo (docs/hero-banner.jpg) as
// background + a quiet brand strip in the bottom-right corner with the
// "co" mark, wordmark and the canonical URL. Reusing the core's hero
// banner keeps the visual identity continuous between repo and site —
// the same image people see in the README is what they share. The
// brand strip adds identity recognition (mark same as favicon/navbar)
// and an implicit CTA via the URL.
export default async function OG() {
  // Fetch the optimized banner from /public (resolved at build/edge).
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://career-ops.org'
      : 'http://localhost:3000';

  const [bannerData, instrumentSerifData] = await Promise.all([
    fetch(`${baseUrl}/og-banner.jpg`).then((r) => r.arrayBuffer()),
    fetch(
      'https://fonts.gstatic.com/s/instrumentserif/v5/jizBRFtNs2ka5fXjeivQ4LroWlx-2zI.ttf',
    ).then((r) => r.arrayBuffer()),
  ]);

  const bannerDataUri = `data:image/jpeg;base64,${Buffer.from(bannerData).toString('base64')}`;

  const brand = 'hsl(26, 73%, 51%)';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          background: '#000',
        }}
      >
        {/* Banner background — full bleed, cover */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bannerDataUri}
          alt=""
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Brand strip — centered horizontally on bottom edge */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              fontFamily: 'Instrument Serif',
            }}
          >
            <span
              style={{
                background: brand,
                width: 72,
                height: 72,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: 56,
                borderRadius: 11,
                letterSpacing: '0.01em',
                lineHeight: 1,
                paddingBottom: 6,
              }}
            >
              co
            </span>
            <span style={{ fontSize: 38, color: 'white', lineHeight: 1 }}>career-ops.org</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Instrument Serif',
          data: instrumentSerifData,
          style: 'normal',
          weight: 400,
        },
      ],
    },
  );
}
