import fs from 'node:fs/promises';
import path from 'node:path';
import { getBranchName, mkdirIfNotExists } from '../utils';
import { getDatabaseUrl } from './get-database-url';
import type { DeploymentConfig, PrePm2Options } from './pre-pm2.types';

export async function prePm2(options: PrePm2Options) {
  const config = {
    deploy: {
      branch: getDeploymentConfig(options),
    },
  };

  const outputPath = path.resolve(__dirname, '../../dist/deployment.json');
  await mkdirIfNotExists(path.dirname(outputPath));

  const data = JSON.stringify(config, null, 2);
  await fs.writeFile(outputPath, data, 'utf-8');
}

/** Returns deployment config for pm2 */
function getDeploymentConfig(options: PrePm2Options): DeploymentConfig {
  const databaseUrl = getDatabaseUrl(options);

  return {
    user: options.user,
    host: options.host,
    path: getPath(options),
    ref: options.branchRef,
    repo: options.repository,
    'post-setup': `yarn install --frozen-lockfile && yarn deployment post-setup --branch-ref='${options.branchRef}' --domain='${options.domain}' --database-url='${databaseUrl}' && nginx -t`,
    'post-deploy':
      'PM2_HOME=./.pm2/ pm2 startOrRestart ./packages/deployment/dist/ecosystem.json && nginx -s reload',
  };
}

/**
 * Returns path on the remote server where branch will be deployment
 */
function getPath(options: PrePm2Options): string {
  const branchName = getBranchName(options.branchRef);
  return path.join(options.workingPath, branchName);
}
