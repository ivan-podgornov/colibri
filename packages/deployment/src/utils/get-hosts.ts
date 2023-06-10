import type { HostsMap } from '../types';
import { getBranchName } from './utils';

/** Returns hosts where applications will be available */
export function getHosts(branchRef: string, domain: string): HostsMap {
  const branchName = getBranchName(branchRef);

  if (branchName === 'main') {
    return {
      components: `components.${domain}`,
      api: `api.${domain}`,
      panel: domain,
    };
  }

  return {
    components: `components-${branchName}.${domain}`,
    api: `api-${branchName}.${domain}`,
    panel: `${branchName}.${domain}`,
  };
}
