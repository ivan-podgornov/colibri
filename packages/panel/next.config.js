// @ts-check

const { ModuleFederationPlugin } = require('webpack').container;

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  webpack: (config) => {
    config.plugins.push(new ModuleFederationPlugin({
      name: 'panel',
      shared: {
        'prop-types': {
          eager: true,
          requiredVersion: '^15',
          import: 'prop-types',
          shareKey: 'prop-types',
          shareScope: 'default',
          singleton: true,
        },
        react: {
          eager: true,
          import: 'react',
          requiredVersion: '^18',
          shareKey: 'react',
          shareScope: 'default',
          singleton: true,
        },
      },
    }));

    return config;
  },
};

module.exports = nextConfig;
