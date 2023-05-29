import { webpack } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import { createConfig } from './create-config';
import type { ColibriOptions } from './types';

export async function run(options: ColibriOptions) {
  const [serverConfig, clientConfig] = await Promise.all([
    createConfig({ ...options, isServer: true }),
    createConfig({ ...options, isServer: false }),
  ]);

  const compiler = webpack([serverConfig, clientConfig]);

  switch (options.mode) {
    case 'build': {
      compiler.run((error, stats) => {
        if (error) {
          console.error(error);
        }

        if (stats) {
          const statsStr = stats.toString({ colors: true });
          console.log(statsStr);
        }
      });
      break;
    }
    case 'development': {
      const server = new WebpackDevServer({ allowedHosts: 'all' }, compiler);
      const port = Number(process.env.PORT) || 3001;
      server.listen(port, 'localhost', (error) => {
        if (error) {
          console.error(error);
        } else {
          console.log(`components has been started on the port ${port}`);
        }
      });
      break;
    }
  }
}
