#!/usr/bin/env node
/* eslint-disable no-unused-expressions */
import { Command } from 'commander';
import compareFiles from '../index.js';
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

  .action(() => {
    // eslint-disable-next-line no-underscore-dangle
    const diff = compareFiles(program.args[0], program.args[1], program._optionValues.format);
    console.log(diff);
  });
/*
  .action((fileName1, lineOptions, rawData) => {
  // compare files based on input raw data
    console.log('program.format = ', fileName1);
    console.log('program.format = ', lineOptions);
    // eslint-disable-next-line no-underscore-dangle
    const outStr = compareFiles(rawData.args[0], rawData.args[1], rawData._optionValues.format);
    // in case no input files return null
    (outStr.length !== 0) ? console.log(outStr) : 'files fully compatible';
  });
*/
program.parse();
