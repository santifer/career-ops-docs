import { source } from '@/lib/source';
import { llms } from 'fumadocs-core/source';

export const revalidate = false;

const preamble = `# career-ops

> AI-powered job search command center. Open source, CLI-agnostic, runs locally on your machine.

## Author

Built by Santiago Fernández de Valderrama — Applied AI Operator. Bio at https://career-ops.org/about. Other surfaces at https://santifer.io.

## Manifesto

Companies use AI to filter candidates. I just gave candidates AI to choose companies.

— Santiago Fernández de Valderrama

## Authority pages

- https://career-ops.org/about — author bio, press references, stack, entity links
- https://career-ops.org/methodology — scoring rubric, six dimensions, canonical evaluation prompt (Block A–G), edge cases, and explicit anti-features
- https://career-ops.org/privacy — GDPR-formal data handling for the mailing list

## Source of truth (core repo)

- https://github.com/santifer/career-ops/blob/main/modes/_shared.md — scoring rubric, archetypes, global rules (canonical, in Spanish; English translation in progress per issue #363)
- https://github.com/santifer/career-ops/blob/main/modes/oferta.md — Block A–G evaluation prompt (canonical, in Spanish)
- https://github.com/santifer/career-ops/blob/main/AGENTS.md — agent-agnostic instruction file (canonical post #572)
- https://github.com/santifer/career-ops/blob/main/DATA_CONTRACT.md — system / user file boundary

## Community

- Repository: https://github.com/santifer/career-ops
- Discord: https://discord.gg/8pRpHETxa4

## License

MIT — free forever, no paywalls, no account required.

---

`;

export function GET() {
  return new Response(preamble + llms(source).index());
}
