/* eslint-disable no-undef */
/* eslint-disable max-len */
import { readFileSync } from 'fs';
import compareFiles from '../src/coreComparator.js';
import { formatOutputValue } from '../src/formatters/json.js';
import { generateRezultArray, objKeySort } from '../src/libComporator.js';
import {
  add, del, uptAdd, uptDel, keep,
} from '../src/constants.js';

// processing files:
const f7 = './__fixtures__/file7.json';
const f8 = './__fixtures__/file8.json';
const f9 = './__fixtures__/file9.yaml';
const f10 = './__fixtures__/file10.yaml';

const objKeySortParams = [
  [{ c: 0 }, [[keep, { c: 0 }]]],
  [{ a: 0, b: 1 }, [[keep, { a: 0 }], [keep, { b: 1 }]]],
  [{ b: 0, a: 1 }, [[keep, { a: 1 }], [keep, { b: 0 }]]],
  [{ a: 0, b: { c: 1 } }, [[keep, { a: 0 }], [keep, { b: [[keep, { c: 1 }]] }]]],
  [{ a: 0, b: { c: 1, d: 3 } }, [[keep, { a: 0 }], [keep, { b: [[keep, { c: 1 }], [keep, { d: 3 }]] }]]],
  [{ a: 0, b: { d: 1, c: 3 } }, [[keep, { a: 0 }], [keep, { b: [[keep, { c: 3 }], [keep, { d: 1 }]] }]]],
  [{ b: 0, a: { d: 1, c: 3 } }, [[keep, { a: [[keep, { c: 3 }], [keep, { d: 1 }]] }], [keep, { b: 0 }]]],
  [{ e: 33, b: 0, a: { d: 1, c: 3 } }, [[keep, { a: [[keep, { c: 3 }], [keep, { d: 1 }]] }], [keep, { b: 0 }], [keep, { e: 33 }]]],
];

test.each(objKeySortParams)('.objKeySort(%o) => %o', async (param, expected) => {
  console.log('objKeySort(param) = ', objKeySort(param));
  expect(objKeySort(param)).toEqual(expected);
});

const generateRezultArrayParams = [
  [{ a: 0 }, {}, [[del, { a: 0 }]]],
  [{ a: 0 }, { a: 1 }, [[uptDel, { a: 0 }], [uptAdd, { a: 1 }]]],
  [{ a: 1 }, { a: 1 }, [[keep, { a: 1 }]]],
  [{ a: '1' }, { a: 1 }, [[uptDel, { a: '1' }], [uptAdd, { a: 1 }]]],
  [{ a: '1' }, { a: '1' }, [[keep, { a: '1' }]]],
  [{ a: 0 }, { b: 1 }, [[del, { a: 0 }], [add, { b: 1 }]]],
  [{ a: 0, c: 3 }, { b: 1 }, [[del, { a: 0 }], [add, { b: 1 }], [del, { c: 3 }]]],
  [{ c: { d: 3 } }, { c: 4 }, [[uptDel, { c: [[keep, { d: 3 }]] }], [uptAdd, { c: 4 }]]],
  [{ c: 4 }, { c: { d: 4 } }, [[uptDel, { c: 4 }], [uptAdd, { c: [[keep, { d: 4 }]] }]]],
  [{ c: { d: 3 } }, { c: { d: 4 } }, [[keep, { c: [[uptDel, { d: 3 }], [uptAdd, { d: 4 }]] }]]],
  [{ a: 1, c: { d: 3 } }, { c: { d: 4 } }, [[del, { a: 1 }], [keep, { c: [[uptDel, { d: 3 }], [uptAdd, { d: 4 }]] }]]],
  [{ c: { d: 3 } }, { a: 1, c: { d: 4 } }, [[add, { a: 1 }], [keep, { c: [[uptDel, { d: 3 }], [uptAdd, { d: 4 }]] }]]],
];

test.each(generateRezultArrayParams)('compare objects %o and %o', (obj1, obj2, rez) => {
  expect(generateRezultArray(obj1, obj2, '')).toEqual(rez);
});

const formatOutputValueParams = [
  ['', '""'],
  ['null', null],
  [null, null],
  [57, 57],
  ['val', '"val"'],
];

test.each(formatOutputValueParams)('formatOutputValue input = %s', (input, expexted) => {
  expect(formatOutputValue(input)).toBe(expexted);
});

const comparationParams = [
  [f7, f8, 'rez42.txt'],
  [f8, f7, 'rez41.txt'],
  [f9, f10, 'rez42.txt'],
  [f10, f9, 'rez41.txt'],
  [f8, f8, 'rez43.txt'],
  [f10, f10, 'rez43.txt'],
  [f10, f8, 'rez43.txt'],
  [f7, f8, 'rez42.txt', 'stylish'],
  [f8, f7, 'rez41.txt', 'stylish'],
  [f9, f10, 'rez42.txt', 'stylish'],
  [f8, f8, 'rez43.txt', 'stylish'],
  [f7, f8, 'rez51.txt', 'plain'],
  [f8, f7, 'rez52.txt', 'plain'],
  [f7, f8, 'rez53.txt', 'json'],
  [f8, f7, 'rez54.txt', 'json'],
];

test.each(comparationParams)('compare multylevel multyformat files %s, %s', async (file1, file2, eqFile, f = '') => {
  const rawData = {
    args: [file1, file2],
    _optionValues: { format: f },
  };
  const rez1 = readFileSync(`./__fixtures__/${eqFile}`).toString();
  expect(compareFiles(rawData)).toBe(rez1);
});
