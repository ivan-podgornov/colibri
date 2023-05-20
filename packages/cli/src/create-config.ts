import path from 'node:path';
import { Configuration } from 'webpack';

import type { ColibriOptions } from './types';
import { getFederationPlugin, getMain, getPackageJson, getPackageName } from './utils';

interface ConfigConstructorOptions extends ColibriOptions {
  isServer: boolean;
}

export async function createConfig(options: ConfigConstructorOptions): Promise<Configuration> {
  const { mode, root } = options;
  const packageJson = await getPackageJson(root);

  return {
    name: options.isServer ? 'server' : 'client',
    mode: mode === 'build' ? 'production' : 'development',
    target: false,

    entry: {
      main: getMain(root, packageJson),
    },

    output: {
      chunkFormat: 'commonjs',
      clean: true,
      filename: '[name].js',
      path: path.resolve(root, './dist/'),
      library: {
        name: getPackageName(packageJson.name),
        type: 'commonjs-module',
      },
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

    plugins: [getFederationPlugin(options.isServer, packageJson)],

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
  };
}
