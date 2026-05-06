// Schema.org JSON-LD emitted in the root layout.
// Person entity is referenced by @id (https://santifer.io/#person), never duplicated here —
// santifer.io is the canonical entity hub. career-ops.org is the work.
import { getProjectStats } from './stats';

export async function siteSchema() {
  const stats = await getProjectStats();
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://career-ops.org/#website',
        url: 'https://career-ops.org',
        name: 'career-ops',
        description:
          'AI-powered job search command center. Open source, CLI-agnostic, runs locally.',
        inLanguage: 'en',
        publisher: { '@id': 'https://santifer.io/#person' },
      },
      {
        '@type': 'SoftwareSourceCode',
        '@id': 'https://career-ops.org/#software',
        name: 'career-ops',
        url: 'https://career-ops.org',
        codeRepository: 'https://github.com/santifer/career-ops',
        programmingLanguage: ['TypeScript', 'Go', 'Bash'],
        license: 'https://opensource.org/licenses/MIT',
        creator: { '@id': 'https://santifer.io/#person' },
        author: { '@id': 'https://santifer.io/#person' },
        discussionUrl: 'https://discord.gg/8pRpHETxa4',
        sameAs: [
          'https://github.com/santifer/career-ops',
          'https://www.wikidata.org/wiki/Q139007988',
        ],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
        interactionStatistic: [
          {
            '@type': 'InteractionCounter',
            interactionType: 'https://schema.org/LikeAction',
            userInteractionCount: stats.stars,
            name: 'GitHub stars',
          },
          {
            '@type': 'InteractionCounter',
            interactionType: 'https://schema.org/ShareAction',
            userInteractionCount: stats.forks,
            name: 'GitHub forks',
          },
          {
            '@type': 'InteractionCounter',
            interactionType: 'https://schema.org/JoinAction',
            userInteractionCount: stats.discordMembers,
            name: 'Discord members',
          },
        ],
      },
    ],
  };
}
