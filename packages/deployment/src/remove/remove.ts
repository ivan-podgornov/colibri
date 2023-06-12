import fs from 'node:fs/promises';
import path from 'node:path';
import { Octokit } from '@octokit/core';

import { getBranchName, getPath, mkdirIfNotExists } from '../utils';
import type { DeploymentConfig, RemoveOptions } from './remove.types';

export async function remove(options: RemoveOptions) {
  await removeGithubEnvironment(options);

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
    key: 'deploy.key',
    user: options.user,
    host: options.host,
    path: getPath(options.branchRef, options.workingPath),
    ref: options.branchRef,
    repo: options.repository,
    // it executes on path: ${path}/current
    'post-deploy': `pm2 delete ../source/packages/deployment/dist/ecosystem.json --namespace ${branchName} && cd ../../ && rm -rf ./${branchName}/ && nginx -s reload`,
  };
}

async function removeGithubEnvironment(options: RemoveOptions) {
  if (process.env.TEST) {
    // We run deployment remove in tests with child process exec function
    // So we can't mock octokit in tests and path TEST variable.
    return;
  }

  const [owner, repo] = new URL(options.repository).pathname.slice(1).split('/');
  const octokit = new Octokit({ auth: process.env.COLIBRI_GITHUB_TOKEN });

  await octokit.request('DELETE /repos/{owner}/{repo}/environments/{environment_name}', {
    owner,
    repo,
    environment_name: getBranchName(options.branchRef),
    headers: { 'X-GitHub-Api-Version': '2022-11-28' },
  });
}
