import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';
import { CoMark } from '@/components/co-mark';
import { instrumentSerifRegular } from './fonts';

type Options = {
  // Drops the brand suffix — used by the docs layout where Fumadocs
  // renders the title in the narrow sidebar and the full home-style
  // branding wraps awkwardly.
  compact?: boolean;
};

export function baseOptions({ compact = false }: Options = {}): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="inline-flex items-center gap-2.5">
          <CoMark size={32} />
          <span className={`${instrumentSerifRegular.className} font-normal text-lg tracking-tight`}>
            {appName}
            {!compact && (
              <span className="hidden md:inline text-brand">
                {', your career operations hub'}
              </span>
            )}
          </span>
        </span>
      ),
      transparentMode: 'top',
      enabled: true,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
