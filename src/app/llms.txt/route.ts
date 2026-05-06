import { source } from '@/lib/source';
import { llms } from 'fumadocs-core/source';

export const revalidate = false;

const preamble = `# career-ops

> AI-powered job search command center. Open source, CLI-agnostic, runs locally on your machine.

## Author

Built by Santiago Fernández de Valderrama — Applied AI Operator. Bio and other projects at https://santifer.io/about

## Manifesto

Companies use AI to filter candidates. I just gave candidates AI to choose companies.

— Santiago Fernández de Valderrama

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
