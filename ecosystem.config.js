module.exports = {
  apps: [
    {
      name: '@colibri/api',
      script: 'yarn',
      args: 'api:prod',
      watch: false,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],

  deploy: {
    branch: {
      user: 'pm2',
      host: '194.67.121.95',
      ref: 'origin/issue-28',
      repo: 'https://github.com/ivan-podgornov/colibri.git',
      path: '/home/pm2/colibri/issue-28/',
      'post-deploy': 'yarn install --frozen-lockfile && pm2 startOrRestart ecosystem.config.js',
    },
  },
};
