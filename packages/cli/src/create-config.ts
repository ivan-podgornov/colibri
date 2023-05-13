import path from 'node:path';
import { container, Configuration } from 'webpack';

import type { ColibriOptions } from './types';
import { exportsToExposes, getMain, getPackageJson, getPackageName } from './utils';

export async function createConfig(options: ColibriOptions): Promise<Configuration> {
  const { mode, root } = options;
  const packageJson = await getPackageJson(root);

  return {
    mode: mode === 'build' ? 'production' : 'development',

    entry: {
      main: getMain(root, packageJson),
    },

    output: {
      clean: true,
      filename: '[name].js',
      path: path.resolve(root, './dist/'),
    },

    module: {
      rules: [
        {
          test: /\.(?:js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', { targets: 'defaults' }], ['@babel/preset-react']],
            },
          },
        },
      ],
    },

    plugins: [
      new container.ModuleFederationPlugin({
        name: getPackageName(packageJson.name),
        filename: 'remoteEntry.js',
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
      }),
    ],

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
  };
}
