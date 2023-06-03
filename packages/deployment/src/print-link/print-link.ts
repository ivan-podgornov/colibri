import type { PrintLinkOptions } from './print-link.types';
import { getHosts } from '../utils';

/** Creates pm2 config for applications and nginx.conf for specified branch */
export async function printLink(options: PrintLinkOptions) {
  const hosts = getHosts(options.branchRef, options.domain);

  process.stdout.write(`http://${hosts.panel}`);
}
