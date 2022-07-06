#!/usr/bin/env node
/* eslint-disable no-unused-expressions */
import { Command } from 'commander';
import compareFiles from '../src/coreComparator.js';
import { defFormat } from '../src/formatters/index.js';

const program = new Command();

program
  .name('gendiff')
  .usage('[options] <filepath1> <filepath2>')
  .argument('[type]', 'type of comparing files')
  .description('Compares two configuration files and shows a difference')
  .option('-V, --version', 'output the version')
  .option('-f, --format <type>', `output format (default: "${defFormat}")`)
  .option('-h, --help', 'display help for command')

  .action((fileName1, lineOptions, rawData) => {
  // compare files based on input raw data
    const outStr = compareFiles(rawData);
    // in case no input files return null
    (outStr.length !== 0) ? console.log(outStr) : 'files fully compatible';
  });

program.parse();
