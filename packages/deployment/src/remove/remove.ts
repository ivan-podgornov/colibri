import fs from 'node:fs/promises';
import path from 'node:path';

import { getBranchName, getPath, mkdirIfNotExists } from '../utils';
import type { DeploymentConfig, RemoveOptions } from './remove.types';

export async function remove(options: RemoveOptions) {
  const config = {
    deploy: {
      remove: getDeploymentConfig(options),
    },
  };

  const outputPath = path.resolve(__dirname, '../../dist/remove-deployment.json');
  await mkdirIfNotExists(path.dirname(outputPath));

  const data = JSON.stringify(config, null, 2);
  await fs.writeFile(outputPath, data, 'utf-8');
}

/** Returns deployment config for pm2 */
function getDeploymentConfig(options: RemoveOptions): DeploymentConfig {
  const branchName = getBranchName(options.branchRef);

  return {
    user: options.user,
    host: options.host,
    path: getPath(options.branchRef, options.workingPath),
    ref: options.branchRef,
    repo: options.repository,
    // it executes on path: ${path}/current
    'post-deploy': `PM2_HOME=../source/.pm2 pm2 kill && cd ../../ && rm -rf ./${branchName}/ && nginx -s reload`,
  };
}
