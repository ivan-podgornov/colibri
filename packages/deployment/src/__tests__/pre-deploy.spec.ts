/* eslint jest/no-hooks: ["error", { "allow": ["beforeAll"] }] */

import { execSync } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import ejs from 'ejs';
import type { HostsMap, PortsMap } from '../pre-deploy/pre-deploy.types';

const ecosystemPath = path.resolve(__dirname, '../../dist/ecosystem.json');
const nginxConfPath = path.resolve(__dirname, '../../dist/nginx.conf');

describe('pre-deploy', () => {
  beforeAll(async () => {
    await Promise.all([
      fs.rm(ecosystemPath, { force: true, recursive: true }),
      fs.rm(nginxConfPath, { force: true, recursive: true }),
    ]);
    const command =
      'yarn deployment pre-deploy --branch-ref origin/main --domain "my-domain.com" --database-url "postgresql://dbuser:dbpassword@127.0.0.1:5432/main"';
    execSync(command, { encoding: 'utf-8', stdio: 'ignore' });
  });

  it('creates ecosystem.json in dist folder with pm2 deployment config', async () => {
    expect.hasAssertions();

    const ecosystem = await fs.readFile(ecosystemPath, 'utf-8');
    const ports: PortsMap = { api: 3002, components: 3001, panel: 3000 };
    const database = { url: 'postgresql://dbuser:dbpassword@127.0.0.1:5432/main' };
    const expectedEcosystem = await ejs.renderFile(
      path.resolve(__dirname, '../pre-deploy/templates/ecosystem.json.ejs'),
      { ports, database }
    );

    expect(ecosystem).toBe(expectedEcosystem);
  });

  it('creates nginx.conf in dist folder', async () => {
    expect.hasAssertions();

    const nginxConf = await fs.readFile(nginxConfPath, 'utf-8');
    const ports: PortsMap = { api: 3002, components: 3001, panel: 3000 };
    const hosts: HostsMap = {
      api: 'api.my-domain.com',
      components: 'components.my-domain.com',
      panel: 'my-domain.com',
    };
    const expectedNginxConf = await ejs.renderFile(
      path.resolve(__dirname, '../pre-deploy/templates/nginx.conf.ejs'),
      { ports, hosts }
    );

    expect(nginxConf).toBe(expectedNginxConf);
  });
});
