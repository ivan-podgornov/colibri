import fs from 'node:fs/promises';
import path from 'node:path';
import ejs from 'ejs';

import { mkdirIfNotExists } from '../utils';
import { getPorts } from './get-ports';
import { getHosts } from './get-hosts';
import type { HostsMap, PortsMap, PreDeployOptions } from './pre-deploy.types';

/** Creates pm2 config for applications and nginx.conf for specified branch */
export async function preDeploy(options: PreDeployOptions) {
  const ports = await getPorts(options);
  const hosts = getHosts(options);

  const [pm2Config, nginxConf] = await Promise.all([
    getPm2Config(options, ports),
    getNginxConfig(hosts, ports),
  ]);

  const outputDir = path.resolve(__dirname, '../../dist/');
  await mkdirIfNotExists(outputDir);

  await Promise.all([
    fs.writeFile(path.resolve(outputDir, './ecosystem.json'), pm2Config),
    fs.writeFile(path.resolve(outputDir, './nginx.conf'), nginxConf),
  ]);
}

/** Returns pm2 config for applications */
function getPm2Config(options: PreDeployOptions, ports: PortsMap) {
  return ejs.renderFile(path.resolve(__dirname, './templates/ecosystem.json.ejs'), {
    ports,
    database: {
      url: options.databaseUrl,
    },
  });
}

/** Returns nginx config for current branch */
function getNginxConfig(hosts: HostsMap, ports: PortsMap) {
  const templatePath = path.resolve(__dirname, './templates/nginx.conf.ejs');
  return ejs.renderFile(templatePath, { hosts, ports });
}
