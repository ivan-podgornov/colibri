import { getBranchName } from '../utils';
import type { HostsMap, PostSetupOptions } from './post-setup.types';

/** Returns hosts where applications will be available */
export function getHosts(options: PostSetupOptions): HostsMap {
  const branchName = getBranchName(options.branchRef);

  if (branchName === 'main') {
    return {
      components: `components.${options.domain}`,
      api: `api.${options.domain}`,
      panel: options.domain,
    };
  }

  return {
    components: `components-${branchName}.${options.domain}`,
    api: `api-${branchName}.${options.domain}`,
    panel: `${branchName}.${options.domain}`,
  };
}
