import { getBranchName } from '../utils';
import type { PrePm2Options } from './pre-pm2.types';

/** Returns url which will be used for database connect */
export function getDatabaseUrl(options: PrePm2Options): string {
  const branchName = getBranchName(options.branchRef);
  return `postgresql://${options.databaseUser}:${options.databasePassword}@${options.databaseHost}:${options.databasePort}/${branchName}`;
}
