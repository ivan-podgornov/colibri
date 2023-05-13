import { join } from 'node:path';
import type { PackageJson } from '../../types';

/**
 * Returns path to entry point
 * @param cwd - path from where user runs script
 * @param packageJson - user's package.json
 */
export function getMain(cwd: string, packageJson: PackageJson): string {
  const defaultMain = './index.js';

  return join(cwd, packageJson.main ?? defaultMain);
}
