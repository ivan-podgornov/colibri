import { NodeFederationPlugin } from '@module-federation/node';
import { container } from 'webpack';

import { exportsToExposes } from '../exports-to-exposes/exports-to-exposes';
import { getPackageName } from '../get-package-name/get-package-name';
import type { PackageJson } from '../../types';

type FederationPluginOptions = ConstructorParameters<typeof container.ModuleFederationPlugin>[0];
type NodeFederationPluginOptions = ConstructorParameters<typeof NodeFederationPlugin>[0];

export function getFederationPlugin(isServer: boolean, packageJson: PackageJson) {
  const folder = isServer ? 'server' : 'client';
  const options: FederationPluginOptions = {
    name: getPackageName(packageJson.name),
    filename: `./${folder}/remoteEntry.js`,
    exposes: exportsToExposes(packageJson.exports),
    shared: {
      'prop-types': {
        requiredVersion: '^15',
        import: 'prop-types',
        shareKey: 'prop-types',
        shareScope: 'default',
        singleton: true,
      },
      react: {
        requiredVersion: '^18',
        import: 'react',
        shareKey: 'react',
        shareScope: 'default',
        singleton: true,
      },
    },
  };

  const serverOptions: Partial<NodeFederationPluginOptions> = {
    library: {
      name: getPackageName(packageJson.name),
      type: 'commonjs-module',
    },
  };

  return isServer
    ? new NodeFederationPlugin({ ...options, ...serverOptions }, {})
    : new container.ModuleFederationPlugin(options);
}
