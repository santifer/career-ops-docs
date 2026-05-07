import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';
import { NavStarChip } from '@/components/nav-star-chip';
import { CoMark } from '@/components/co-mark';

type Options = {
  // Drops the brand suffix and the star chip — used by the docs layout
  // where Fumadocs renders the title in the narrow sidebar and the full
  // home-style branding wraps awkwardly.
  compact?: boolean;
};

export function baseOptions({ compact = false }: Options = {}): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="inline-flex items-center gap-2.5">
          <CoMark size={32} />
          <span>
            {appName}
            {!compact && (
              <span className="hidden md:inline text-brand font-normal">
                {', your career operations hub'}
              </span>
            )}
          </span>
        </span>
      ),
      // Persistent live star count chip on the right side of the navbar.
      // Uses NavOptions.children slot from Fumadocs. Hidden in compact
      // (docs sidebar) — too cramped there.
      children: compact ? null : <NavStarChip />,
      transparentMode: 'top',
      enabled: true,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
