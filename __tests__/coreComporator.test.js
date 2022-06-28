import compareObjects from '../src/coreComparator.js';
import { readFileSync } from 'fs';
//import { test, expect } from 'jest';

// processing files:
const f1 = '__fixtures__/file1.json';
const f2 = '__fixtures__/file2.json';
const f3 = '__fixtures__/file3.json';
const f4 = '__fixtures__/file4.yml';
const f5 = '__fixtures__/file5.yml';
const f6 = '__fixtures__/file6.yaml';
const f7 = '__fixtures__/file7.json';
const f8 = '__fixtures__/file8.json';
const f9 = '__fixtures__/file9.yaml';
const f10 = '__fixtures__/file10.yaml';

const comparation = (file1, file2, eqFile) => {
  const rawData = {
    args : [file1 , file2]};
  const rez1 = readFileSync('__fixtures__/' + eqFile).toString();
  expect(compareObjects(rawData)).toEqual(rez1);
}

test('compare files', () => {
  //comaration of json files
  //same files to compare
  comparation(f1, f1, 'rez1')
  // emty file comparation
  comparation(f1, f2, 'rez21');
  comparation(f2, f1, 'rez22');
  // different files
  comparation(f1, f3, 'rez3');
  //comaration of YAML files
  //same files to compare
  comparation(f4, f4, 'rez1')
  // emty file comparation
  comparation(f4, f5, 'rez21');
  comparation(f5, f4, 'rez22');
  // different files
  comparation(f4, f6, 'rez3');
  //comaration of mix YAML and json files
  //same files to compare
  comparation(f1, f4, 'rez1')
  // emty file comparation
  comparation(f4, f2, 'rez21');
  comparation(f5, f1, 'rez22');
  // different files
  comparation(f1, f6, 'rez3');
  // comparation of multylevel files
  comparation(f7, f8, 'rez42');
  comparation(f8, f7, 'rez41');
  comparation(f9, f10, 'rez42');
  comparation(f10, f9, 'rez41');
  comparation(f8, f8, 'rez43');
  comparation(f10, f10, 'rez43');
  comparation(f10, f8, 'rez43');
  });