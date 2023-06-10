#!/usr/bin/env ts-node

import { Command } from 'commander';

import { prePm2 } from './pre-pm2';
import { preDeploy } from './pre-deploy';
import { printLink } from './print-link';
import { remove } from './remove';

const program = new Command('deployment');

program
  .command('pre-pm2')
  .option('--branch-ref <string>', 'The ref of the branch that is being published')
  .option('--domain <string>', 'The domain name through which the server is accessible')
  .option('--host <string>', 'Ip address of the remote server')
  .option('--repository <string>', 'Repository address')
  .option('--working-path <path>', 'Working path on the remote server')
  .option('--user <string>', "User's name on the remote server")
  .option('--database-user <string>', 'Database user')
  .option('--database-password <string>', 'Database password')
  .option('--database-host <string>', 'Database host')
  .option('--database-port <number>', 'Database port')
  .action(prePm2);

program
  .command('pre-deploy')
  .option('--branch-ref <string>', 'The ref of the branch that is being published')
  .option('--domain <string>', 'The domain name through which the server is accessible')
  .option('--database-url <string>', 'URL that can be used for connect to database')
  .action(preDeploy);

program
  .command('print-link')
  .option('--branch-ref <string>', 'The ref of the branch that is being published')
  .option('--domain <string>', 'The domain name through which the server is accessible')
  .action(printLink);

program
  .command('remove')
  .option('--branch-ref <string>', 'The ref of the branch that is being published')
  .option('--host <string>', 'Ip address of the remote server')
  .option('--repository <string>', 'Repository address')
  .option('--working-path <path>', 'Working path on the remote server')
  .option('--user <string>', "User's name on the remote server")
  .action(remove);

program.parse(process.argv);
