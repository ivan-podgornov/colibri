/* eslint jest/no-hooks: ["error", { "allow": ["beforeAll"] }] */

import { execSync } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';

const removeDeploymentPath = path.resolve(__dirname, '../../dist/remove-deployment.json');

describe('remove', () => {
  beforeAll(async () => {
    await fs.rm(removeDeploymentPath, { force: true, recursive: true });
    const command =
      'TEST=1 yarn deployment remove --branch-ref origin/issue-34 --host "192.168.0.1" ' +
      '--repository "https://github.com/user/repository" --working-path "/home/pm2/repository" ' +
      '--user pm2';

    execSync(command, { encoding: 'utf-8', stdio: 'ignore' });
  });

  it('creates remove-deployment.json in dist folder with pm2 deployment config', async () => {
    expect.hasAssertions();

    const json = await fs.readFile(removeDeploymentPath, 'utf-8');
    const config = JSON.parse(json);

    expect(config).toStrictEqual({
      deploy: {
        remove: {
          key: 'deploy.key',
          user: 'pm2',
          host: '192.168.0.1',
          path: '/home/pm2/repository/issue-34',
          ref: 'origin/issue-34',
          repo: 'https://github.com/user/repository',
          'post-deploy':
            'PM2_HOME=../source/.pm2 pm2 kill && cd ../../ && rm -rf ./issue-34/ && nginx -s reload',
        },
      },
    });
  });
});
