/* eslint jest/no-hooks: ["error", { "allow": ["beforeAll"] }] */

import { execSync } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import ejs from 'ejs';
import type { HostsMap, PortsMap } from '../post-setup/post-setup.types';

const ecosystemPath = path.resolve(__dirname, '../../dist/ecosystem.json');
const nginxConfPath = path.resolve(__dirname, '../../dist/nginx.conf');

describe('pre-pm2', () => {
  beforeAll(async () => {
    await Promise.all([
      fs.rm(ecosystemPath, { force: true, recursive: true }),
      fs.rm(nginxConfPath, { force: true, recursive: true }),
    ]);
    const command = 'yarn deployment post-setup --branch-ref origin/main --domain "my-domain.com"';
    execSync(command, { encoding: 'utf-8', stdio: 'ignore' });
  });

  it('creates ecosystem.json in dist folder with pm2 deployment config', async () => {
    expect.hasAssertions();

    const ecosystem = await fs.readFile(ecosystemPath, 'utf-8');
    const ports: PortsMap = { api: 3002, components: 3001, panel: 3000 };
    const expectedEcosystem = await ejs.renderFile(
      path.resolve(__dirname, '../post-setup/templates/ecosystem.json.ejs'),
      { ports }
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
      path.resolve(__dirname, '../post-setup/templates/nginx.conf.ejs'),
      { ports, hosts }
    );

    expect(nginxConf).toBe(expectedNginxConf);
  });
});
