/* eslint jest/no-hooks: ["error", { "allow": ["beforeAll"] }] */

import { execSync } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';

const deploymentPath = path.resolve(__dirname, '../../dist/deployment.json');

describe('pre-pm2', () => {
  beforeAll(async () => {
    await fs.rm(deploymentPath, { force: true, recursive: true });
    const command =
      'yarn deployment pre-pm2 --branch-ref origin/issue-28 --domain "my-domain.com" ' +
      '--host "192.168.0.1" --repository "https://github.com/user/repository" ' +
      '--working-path "/home/pm2/repository" --user pm2';

    execSync(command, { encoding: 'utf-8', stdio: 'ignore' });
  });

  it('creates deployment.json in dist folder with pm2 deployment config', async () => {
    expect.hasAssertions();

    const json = await fs.readFile(deploymentPath, 'utf-8');
    const config = JSON.parse(json);

    expect(config).toStrictEqual({
      deploy: {
        branch: {
          user: 'pm2',
          host: '192.168.0.1',
          path: '/home/pm2/repository/issue-28',
          ref: 'origin/issue-28',
          repo: 'https://github.com/user/repository',
          'post-setup':
            'yarn install --frozen-lockfile && yarn deployment post-setup --branch-name="origin/issue-28" --domain="my-domain.com" && nginx -t',
          'post-deploy':
            'PM2_HOME=./.pm2/ yarn pm2 startOrRestart ./packages/deployment/dist/ecosystem.json && service nginx reload',
        },
      },
    });
  });
});