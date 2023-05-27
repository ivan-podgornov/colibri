import fs from 'node:fs/promises';
import path, { dirname } from 'node:path';
import type { DeploymentConfig, PrePm2Options } from './pre-pm2.types';

export async function prePm2(options: PrePm2Options) {
  const config = {
    deploy: {
      branch: getDeploymentConfig(options),
    },
  };

  const outputPath = path.resolve(__dirname, '../../dist/deployment.json');
  await mkdirIfNotExists(dirname(outputPath));

  const data = JSON.stringify(config, null, 2);
  await fs.writeFile(outputPath, data, 'utf-8');
}

/** Returns deployment config for pm2 */
export function getDeploymentConfig(options: PrePm2Options): DeploymentConfig {
  const branchName = path.basename(options.branchRef);

  return {
    user: options.user,
    host: options.host,
    path: path.resolve(options.workingPath, branchName),
    ref: options.branchRef,
    repo: options.repository,
  };
}

/**
 * Returns path on the remote server where branch will be deployment
 */
export function getPath(options: PrePm2Options): string {
  const branchName = path.basename(options.branchRef);
  return path.join(options.workingPath, branchName);
}

async function mkdirIfNotExists(path: string): Promise<void> {
  try {
    await fs.mkdir(path, { recursive: true });
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'EEXISTS') {
      return;
    }

    throw error;
  }
}
