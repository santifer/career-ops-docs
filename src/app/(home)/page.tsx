import Link from 'next/link';
import Image from 'next/image';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/cn';
import { HeartIcon, TerminalIcon } from 'lucide-react';
import { Hero, CreateAppAnimation, AgnosticBackground } from './page.client';

const buttonVariants = cva(
  'inline-flex justify-center px-5 py-3 rounded-full font-medium tracking-tight transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-brand text-brand-foreground hover:bg-brand-200',
        secondary: 'border bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-accent',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

type Contributor = {
  login: string;
  avatar_url: string;
  html_url: string;
};

async function getContributors(): Promise<Contributor[]> {
  try {
    const res = await fetch('https://api.github.com/repos/santifer/career-ops/contributors', {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const contributors = await getContributors();
  return (
    <>
      <div className="relative flex min-h-[600px] h-[70vh] max-h-[900px] border rounded-2xl overflow-hidden mx-auto w-full max-w-[1400px] bg-origin-border mt-4">
        <Hero />
        <Image
          src="/hero_image.png"
          alt="hero-image"
          width={1628}
          height={1044}
          className="absolute top-[460px] left-[15%] max-w-[1400px] rounded-xl lg:top-[380px] block [animation:fade-in-delayed_700ms_ease_400ms_both]"
          priority
        />
        <div className="flex flex-col z-2 px-4 size-full md:p-12 max-md:items-center max-md:text-center">
          <p className="mt-12 text-xs text-brand font-medium rounded-full p-2 border border-brand/50 w-fit">
            Your career operations hub.
          </p>
          <h1 className="text-4xl my-8 leading-tight font-medium xl:text-5xl xl:mb-12">
            You got the job,
            <br />
            and it didn't cost you a <span className="text-brand">thing</span>.
          </h1>
          <div className="flex flex-row items-center gap-4 flex-wrap w-fit">
            <Link href="/docs" className={cn(buttonVariants(), 'max-sm:text-sm')}>
              Get Started
            </Link>
            <Link href="/docs" className={cn(buttonVariants({ variant: 'secondary' }), 'max-sm:text-sm')}>
              Contribute on GitHub
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 mt-12 px-6 mx-auto w-full max-w-[1400px] md:px-12 lg:grid-cols-2 lg:mt-20">
        <p className="text-2xl tracking-tight leading-snug font-light col-span-full md:text-3xl xl:text-4xl">
          Turn any AI coding CLI into a full job search <span className="text-brand font-medium">command center</span>. Instead of <span className="text-brand font-medium">manually</span> tracking applications in a spreadsheet, you get an AI-powered pipeline that scan portals, generates tailored PDFs and tracks everything for you. It's like having a career coach for your job search, but <span className="text-brand font-medium">without the cost</span>.
        </p>

        <div className="relative h-[400px] lg:h-[480px] rounded-2xl col-span-full overflow-hidden flex items-center justify-center p-4 md:p-8">
          <Image
            src="/buffalo-dither.png"
            loading='lazy'
            alt="hero-image"
            width={1628}
            height={1044}
            className="absolute inset-0 size-full object-cover object-[80%_bottom] -z-1"
          />
          <div className="mx-auto w-full max-w-[800px] p-2 bg-fd-card text-fd-card-foreground border rounded-2xl shadow-lg">
            <div className="flex flex-row gap-2">
              <h2 className="text-brand content-center font-mono font-bold uppercase border-2 border-brand/50 px-2 rounded-xl text-sm">
                Try it out
              </h2>
              <div className="flex-1 rounded-xl bg-fd-secondary border shadow-sm px-4 py-2 font-mono text-sm text-fd-muted-foreground">
                git clone https://github.com/santifer/career-ops.git
              </div>
            </div>

            <div className="relative bg-fd-secondary rounded-xl mt-2 border shadow-md">
              <div className="flex flex-row items-center gap-2 border-b p-2 text-fd-muted-foreground">
                <TerminalIcon className="size-4" />
                <span className="text-xs font-medium">Terminal</span>
                <div className="ms-auto me-2 size-2 rounded-full bg-red-400" />
              </div>
              <CreateAppAnimation className="p-2 text-fd-secondary-foreground/80" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl text-sm p-6 bg-origin-border shadow-lg border bg-fd-card relative flex flex-col overflow-hidden z-2 min-h-[340px]">
          <h3 className="font-medium tracking-tight text-xl lg:text-2xl mb-6">
            AI-Native & Agnostic
          </h3>
          <p className="mb-20">
            Works with any coding CLI — Claude Code, Open Code, Gemini CLI, Codex, Qwen CLI, you name it.
          </p>
          <AgnosticBackground />
        </div>

        <div className="rounded-2xl text-sm p-6 bg-origin-border shadow-lg border bg-fd-card min-h-[340px]">
          <h3 className="font-medium tracking-tight text-xl lg:text-2xl mb-6">
            Not spray-and-pray.
          </h3>
          <p className="mb-6">
            The system refuses to recommend applying to anything scoring below 4.0 out of 5. Every evaluation is a hard filter — not a nudge.
          </p>
          <Link href="docs/introduction/what-is-career-ops" className={cn(buttonVariants({ variant: 'secondary' }), 'text-sm')}>
            Read our mission statement
          </Link>
        </div>


        <div className="rounded-2xl text-sm p-6 bg-origin-border shadow-lg border bg-fd-card min-h-[340px] flex flex-col">
          <h3 className="font-medium tracking-tight text-xl lg:text-2xl mb-6">
            45+ company portals. Zero manual searching.
          </h3>
          <p className="mb-6">
            Pre-configured scrapers check career pages across 45+ companies and job aggregators on demand. Run <code className="font-mono text-brand">/career-ops scan</code> and get a ranked list back in minutes.
          </p>
          <Link href="/docs" className={cn(buttonVariants({ variant: 'secondary' }), 'text-sm w-fit')}>
            See all portals
          </Link>
        </div>

        <div className="rounded-2xl text-sm p-6 bg-origin-border shadow-lg border bg-fd-card min-h-[340px] flex flex-col">
          <h3 className="font-medium tracking-tight text-xl lg:text-2xl mb-6">
            Your resume, rewritten for every job.
          </h3>
          <p className="mb-8">
            Career Ops generates an ATS-optimized PDF tailored to each job description. Not a template swap — a reasoned rewrite based on what the employer actually asked for.
          </p>
          <div className="mt-auto flex flex-col gap-2 @container mask-[linear-gradient(to_bottom,white,transparent)]">
            {[
              { role: 'Solutions Architect', note: 'Emphasized technical leadership; softened IC scope.' },
              { role: 'Solutions Engineer', note: 'Highlighted customer-facing delivery; added pre-sales framing.' },
              { role: 'Staff Engineer', note: 'Foregrounded cross-team influence over individual contribution.' },
              { role: 'Engineering Manager', note: 'Reframed team-building stories; removed IC-heavy bullets.' },
              { role: 'Head of Engineering', note: 'Led with org design; positioned prior startups as context.' },
            ].map(({ role, note }) => (
              <div key={role} className="flex flex-col text-sm gap-2 p-2 border border-dashed border-brand-secondary @lg:flex-row @lg:items-center last:@max-lg:hidden">
                <p className="font-medium text-nowrap">{role}</p>
                <p className="text-xs flex-1 text-fd-muted-foreground @lg:text-end">{note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="font-medium tracking-tight text-3xl lg:text-4xl mt-8 text-brand text-center mb-4 col-span-full">
          100% Open-Source.
        </div>

        <div className="col-span-full rounded-2xl text-sm p-6 bg-origin-border shadow-lg border bg-fd-card">
          <div className="max-w-3xl flex flex-col">
            <HeartIcon className="text-pink-500 mb-4 size-6" fill="currentColor" />
            <h3 className="font-medium tracking-tight text-xl lg:text-2xl mb-6">Built from the job search trenches.</h3>
            <p className="mb-8">
              CareerOps was created by{' '}
              <a href="https://x.com/santifer" target="_blank" rel="noreferrer noopener" className="text-brand font-medium hover:underline">
                Santifer
              </a>{' '}
              to evaluate over 740 job offers and land a Head of Applied AI role. He decided to open source it — now it&apos;s powered by passion and the open source community.
            </p>
            <div className="mb-8 flex flex-row items-center gap-2">
              <a
                href="https://github.com/santifer/career-ops"
                target="_blank"
                rel="noreferrer noopener"
                className={cn(buttonVariants(), 'text-sm')}
              >
                Contribute on GitHub
              </a>
              <a
                href="https://github.com/santifer/career-ops/graphs/contributors"
                target="_blank"
                rel="noreferrer noopener"
                className={cn(buttonVariants({ variant: 'secondary' }), 'text-sm')}
              >
                Contributors
              </a>
            </div>
          </div>

          <div className="flex flex-col items-start gap-4">
            <div className="flex flex-row flex-wrap items-center">
              {contributors.map((contributor, i) => (
                <a
                  key={contributor.login}
                  href={contributor.html_url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="size-10 overflow-hidden rounded-full border-4 border-fd-background bg-fd-background -mr-3 md:size-12"
                  style={{ zIndex: contributors.length - i }}
                >
                  <Image
                    src={contributor.avatar_url}
                    alt={contributor.login}
                    width={48}
                    height={48}
                    className="size-full object-cover"
                  />
                </a>
              ))}
            </div>
            <p className="text-xs text-fd-muted-foreground">Meet our contributors.</p>
          </div>
        </div>
      </div>
    </>
  );
}
