import flatCompare from '../src/coreComparator.js';
import { readFileSync } from 'fs';
//import { test, expect } from 'jest';


const f1 = '__fixtures__/file1.json';
const f2 = '__fixtures__/file2.json';
const f3 = '__fixtures__/file3.json';

const comparation = (file1, file2, eqFile) => {
  const rawData = {
    args : [file1 , file2]};
  const rez1 = readFileSync('__fixtures__/' + eqFile).toString();
  expect(flatCompare(rawData)).toEqual(rez1);
}

test('compare files', () => {
  //same files to compare
  comparation(f1, f1, 'rez1')
  // emty file comparation
  comparation(f1, f2, 'rez21');
  comparation(f2, f1, 'rez22');
  // different files
  comparation(f1, f3, 'rez3');
  });