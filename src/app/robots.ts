import type { MetadataRoute } from 'next';

const SITE_URL = 'https://career-ops.org';

// AI crawlers explicitly allowed. career-ops.org wants to be cited by
// ChatGPT / Claude / Perplexity / Gemini etc. — that channel converts
// repo virality into inbound. Default-allow works but explicit signals
// intent and survives policy changes by individual bots.
const aiCrawlers = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'CCBot',
  'Applebot-Extended',
  'cohere-ai',
  'Meta-ExternalAgent',
  'Bytespider',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Internal/asset endpoints, not human content.
        disallow: ['/api/', '/og/', '/llms.mdx/'],
      },
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
