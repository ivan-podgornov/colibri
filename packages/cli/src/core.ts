import { webpack } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import { createConfig } from './create-config';
import type { ColibriOptions } from './types';

export async function run(options: ColibriOptions) {
  const config = await createConfig(options);
  const compiler = webpack(config);

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
      const server = new WebpackDevServer(config.devServer, compiler);
      server.listen(3001, 'localhost', () => console.log('port 3001 closed'));
      break;
    }
  }
}
