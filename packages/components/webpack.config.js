const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  mode: 'production',

  entry: {
    main: path.resolve(__dirname, './src/index.ts'),
  },

  output: {
    clean: true,
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
      name: 'colibri_components',
      filename: 'remoteEntry.js',
      exposes: {
        Promo: './src/promo',
        User: './src/user',
      },
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
    extensions: ['.ts', '.tsx', '.js'],
  },
}
