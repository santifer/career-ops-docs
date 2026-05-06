import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span>
          {appName}
          <span className="hidden md:inline text-brand font-normal">{', your career operations hub'}</span>
        </span>
      ),
      transparentMode: 'top',
      enabled: true,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
