const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  mode: 'production',

  entry: {
    promo: path.resolve(__dirname, './promo.tsx'),
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist/'),
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(__dirname, '../../tsconfig.json'),
          },
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'Promo',
      filename: 'remoteEntry.js',
      exposes: {
        './component': './promo.tsx',
      },
      shared: {
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
    extensions: ['.ts', '.tsx', '.js'],
  },
}
