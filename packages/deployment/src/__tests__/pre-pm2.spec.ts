/* eslint jest/no-hooks: ["error", { "allow": ["beforeAll"] }] */

import { execSync } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';

describe('pre-pm2', () => {
  beforeAll(async () => {
    const outputPath = path.resolve(__dirname, '../../dist/');
    await fs.rm(outputPath, { force: true, recursive: true });
  });

  it('creates deployment.json in dist folder with pm2 deployment config', async () => {
    expect.hasAssertions();

    const command =
      'yarn deployment pre-pm2 --branch-ref origin/issue-28 --domain "my-domain.com" ' +
      '--host "192.168.0.1" --repository "https://github.com/user/repository" ' +
      '--working-path "/home/pm2/repository" --user pm2';

    execSync(command, { encoding: 'utf-8', stdio: 'ignore' });
    const json = await fs.readFile(path.resolve(__dirname, '../../dist/deployment.json'), 'utf-8');
    const config = JSON.parse(json);

    expect(config).toStrictEqual({
      deploy: {
        branch: {
          user: 'pm2',
          host: '192.168.0.1',
          path: '/home/pm2/repository/issue-28',
          ref: 'origin/issue-28',
          repo: 'https://github.com/user/repository',
        },
      },
    });
  });
});
