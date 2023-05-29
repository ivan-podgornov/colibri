import { findFreePorts } from 'find-free-ports';
import { getBranchName } from '../utils';
import type { PostSetupOptions, PortsMap } from './post-setup.types';

export const DEFAULT_PORTS = {
  components: 3001,
  panel: 3000,
  api: 3002,
};

/** Returns ports where applications will be available */
export async function getPorts(options: PostSetupOptions): Promise<PortsMap> {
  const branchName = getBranchName(options.branchRef);

  if (branchName === 'main') {
    return DEFAULT_PORTS;
  }

  const [components, panel, api] = await findFreePorts(3, {
    startPort: 3005,
    endPort: 4000,
  });

  return { components, panel, api };
}
