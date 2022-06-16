#!/usr/bin/env node

import flatCompare from '../src/coreComparator.js';

import { readFileSync } from 'fs';

import { Command } from 'commander';
const program = new Command();

program
  .name('gendiff')
  .usage('[options] <filepath1> <filepath2>')
  .argument('[type]', 'type of comparing files')
  .description('Compares two configuration files and shows a difference')
  .option('-V, --version', 'output the version')
  .option('-f, --format <type>', 'output format (default: "stylish")')
  .option('-h, --help', 'display help for command')

  .action((fileName1, lineOptions, rawData) => {

  const outStr = flatCompare(rawData);
  (outStr.length !== 0) ? console.log(outStr) : null;

  })

program.parse();
if (program.opts().help === true) program.help();	
