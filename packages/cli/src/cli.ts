#!/usr/bin/env ts-node

import { Command } from 'commander';
import { run } from './core';
import { ColibriOptions } from './types';

const program = new Command('colibri');

program.option('-r, --root <path>', 'Path to package with colibri components', process.cwd());

program
  .command('dev')
  .description('Run colibri builder in dev mode')
  .action(() => {
    const options = program.opts<ColibriOptions>();
    run({ ...options, mode: 'development' });
  });

program
  .command('build')
  .description('Compile colibri components')
  .action(() => {
    const options = program.opts<ColibriOptions>();
    run({ ...options, mode: 'build' });
  });

program.parse(process.argv);
