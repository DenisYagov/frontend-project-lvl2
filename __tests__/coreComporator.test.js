import flatCompare from '../src/coreComparator.js';
import { readFileSync } from 'fs';

const f1 = '__fixtures__/file1.json';
const f2 = '__fixtures__/file2.json';
const f3 = '__fixtures__/file3.json';

test('simple compare same files', () => {
    const rawData = {
        args : [f1 , f1]};
    const rez1 = readFileSync('__fixtures__/rez1').toString();
    expect(flatCompare(rawData)).toEqual(rez1);
  });

test('compare with empty files', () => {
    const rawData = {
        args : [f1 , f2]};
    const rez21 = readFileSync('__fixtures__/rez21').toString();
    expect(flatCompare(rawData)).toEqual(rez21);
    rawData.args[0] = f2;
    rawData.args[1] = f1;
    const rez22 = readFileSync('__fixtures__/rez22').toString();
    expect(flatCompare(rawData)).toEqual(rez22);
  });

  test('simple compare different files', () => {
    const rawData = {
        args : [f1 , f3]};
    const rez3 = readFileSync('__fixtures__/rez3').toString();
    expect(flatCompare(rawData)).toEqual(rez3);
  });