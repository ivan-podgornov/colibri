#!/usr/bin/env ts-node

import { Command } from 'commander';
import { prePm2 } from './pre-pm2';
import { postSetup } from './post-setup';

const program = new Command('deployment');

program
  .command('pre-pm2')
  .option('-b, --branch-ref <string>', 'The ref of the branch that is being published')
  .option('-d, --domain <string>', 'The domain name through which the server is accessible')
  .option('-h, --host <string>', 'Ip address of the remote server')
  .option('-r, --repository <string>', 'Repository address')
  .option('-wp, --working-path <path>', 'Working path on the remote server')
  .option('-u, --user <string>', "User's name on the remote server")
  .action(prePm2);

program
  .command('post-setup')
  .option('-b, --branch-ref <string>', 'The ref of the branch that is being published')
  .option('-d, --domain <string>', 'The domain name through which the server is accessible')
  .action(postSetup);

program.parse(process.argv);
