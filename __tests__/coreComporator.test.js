/* eslint-disable max-len */
/* eslint-disable object-shorthand */
/* eslint-disable no-undef */
import { readFileSync } from 'fs';
import compareFiles from '../src/coreComparator.js';
import { formatOutputValue } from '../src/formatters/json.js';
import { generateRezultArray, objKeySort } from '../src/libComporator.js';
import {
  add, del, uptAdd, uptDel, keep,
} from '../src/constants.js';

// processing files:
const f1 = './__tests__/__fixtures__/file1.json';
const f2 = './__tests__/__fixtures__/file2.json';
const f3 = './__tests__/__fixtures__/file3.json';
const f4 = './__tests__/__fixtures__/file4.yml';
const f5 = './__tests__/__fixtures__/file5.yml';
const f6 = './__tests__/__fixtures__/file6.yaml';
const f7 = './__tests__/__fixtures__/file7.json';
const f8 = './__tests__/__fixtures__/file8.json';
const f9 = './__tests__/__fixtures__/file9.yaml';
const f10 = './__tests__/__fixtures__/file10.yaml';

const comparation = (file1, file2, eqFile, format = '') => {
  const rawData = {
    args: [file1, file2],
    _optionValues: { format: format },
  };
  const rez1 = readFileSync(`./__tests__/__fixtures__/${eqFile}`).toString();
  expect(compareFiles(rawData)).toEqual(rez1);
};

test('check objKeySort function in libComporator file', () => {
  // console.log('objKeySort({ a: 0 } = ', objKeySort({ a: 0 }));
  expect(objKeySort({ a: 0 }))
    .toEqual([[keep, { a: 0 }]]);
  expect(objKeySort({ a: 0, b: 1 }))
    .toEqual([[keep, { a: 0 }], [keep, { b: 1 }]]);
  expect(objKeySort({ b: 0, a: 1 }))
    .toEqual([[keep, { a: 1 }], [keep, { b: 0 }]]);
  expect(objKeySort({ a: 0, b: { c: 1 } }))
    .toEqual([[keep, { a: 0 }], [keep, { b: [[keep, { c: 1 }]] }]]);
  expect(objKeySort({ a: 0, b: { c: 1, d: 3 } }))
    .toEqual([[keep, { a: 0 }], [keep, { b: [[keep, { c: 1 }], [keep, { d: 3 }]] }]]);
  expect(objKeySort({ a: 0, b: { d: 1, c: 3 } }))
    .toEqual([[keep, { a: 0 }], [keep, { b: [[keep, { c: 3 }], [keep, { d: 1 }]] }]]);
  expect(objKeySort({ b: 0, a: { d: 1, c: 3 } }))
    .toEqual([[keep, { a: [[keep, { c: 3 }], [keep, { d: 1 }]] }], [keep, { b: 0 }]]);
  expect(objKeySort({ e: 33, b: 0, a: { d: 1, c: 3 } }))
    .toEqual([[keep, { a: [[keep, { c: 3 }], [keep, { d: 1 }]] }], [keep, { b: 0 }], [keep, { e: 33 }]]);
});

test('check generateRezultArray function in libComporator file', () => {
  expect(generateRezultArray({ a: 0 }, {}, ''))
    .toEqual([[del, { a: 0 }]]);
  expect(generateRezultArray({ a: 0 }, { a: 1 }, ''))
    .toEqual([[uptDel, { a: 0 }], [uptAdd, { a: 1 }]]);
  expect(generateRezultArray({ a: 1 }, { a: 1 }, '')).toEqual([[keep, { a: 1 }]]);
  expect(generateRezultArray({ a: '1' }, { a: 1 }, ''))
    .toEqual([[uptDel, { a: '1' }], [uptAdd, { a: 1 }]]);
  expect(generateRezultArray({ a: '1' }, { a: '1' }, '')).toEqual([[keep, { a: '1' }]]);
  expect(generateRezultArray({ a: 0 }, { b: 1 }, ''))
    .toEqual([[del, { a: 0 }], [add, { b: 1 }]]);
  expect(generateRezultArray({ a: 0, c: 3 }, { b: 1 }, ''))
    .toEqual([[del, { a: 0 }], [add, { b: 1 }], [del, { c: 3 }]]);
  expect(generateRezultArray({ c: { d: 3 } }, { c: 4 }, ''))
    .toEqual([[uptDel, { c: [[keep, { d: 3 }]] }], [uptAdd, { c: 4 }]]);
  expect(generateRezultArray({ c: 4 }, { c: { d: 4 } }, ''))
    .toEqual([[uptDel, { c: 4 }], [uptAdd, { c: [[keep, { d: 4 }]] }]]);
  expect(generateRezultArray({ c: { d: 3 } }, { c: { d: 4 } }, ''))
    .toEqual([[keep, { c: [[uptDel, { d: 3 }], [uptAdd, { d: 4 }]] }]]);
  expect(generateRezultArray({ a: 1, c: { d: 3 } }, { c: { d: 4 } }, ''))
    .toEqual([[del, { a: 1 }], [keep, { c: [[uptDel, { d: 3 }], [uptAdd, { d: 4 }]] }]]);
  expect(generateRezultArray({ c: { d: 3 } }, { a: 1, c: { d: 4 } }, ''))
    .toEqual([[add, { a: 1 }], [keep, { c: [[uptDel, { d: 3 }], [uptAdd, { d: 4 }]] }]]);
});

test('compare flat files', () => {
  // comaration of json files
  // same files to compare
  comparation(f1, f1, 'rez1.txt');
  // emty file comparation
  comparation(f1, f2, 'rez21.txt');
  comparation(f2, f1, 'rez22.txt');
  // different files
  comparation(f1, f3, 'rez3.txt');
  // comaration of YAML files
  // same files to compare
  comparation(f4, f4, 'rez1.txt');
  // emty file comparation
  comparation(f4, f5, 'rez21.txt');
  comparation(f5, f4, 'rez22.txt');
  // different files
  comparation(f4, f6, 'rez3.txt');
  // comaration of mix YAML and json files
  // same files to compare
  comparation(f1, f4, 'rez1.txt');
  // emty file comparation
  comparation(f4, f2, 'rez21.txt');
  comparation(f5, f1, 'rez22.txt');
  // different files
  comparation(f1, f6, 'rez3.txt');
});

test('compare multylevel files', () => {
// comparation of multylevel files
  comparation(f7, f8, 'rez42.txt');
  comparation(f8, f7, 'rez41.txt');
  comparation(f9, f10, 'rez42.txt');
  comparation(f10, f9, 'rez41.txt');
  comparation(f8, f8, 'rez43.txt');
  comparation(f10, f10, 'rez43.txt');
  comparation(f10, f8, 'rez43.txt');
});

test('formatOutputValue function test', () => {
  expect(formatOutputValue('')).toEqual('""');
  expect(formatOutputValue('null')).toEqual(null);
  expect(formatOutputValue(null)).toEqual(null);
  expect(formatOutputValue(57)).toEqual(57);
  expect(formatOutputValue('val')).toEqual('"val"');
});

test('compare multylevel multyformat files', () => {
  // comparation of multylevel files
  comparation(f7, f8, 'rez42.txt', 'stylish');
  comparation(f8, f7, 'rez41.txt', 'stylish');
  comparation(f9, f10, 'rez42.txt', 'stylish');
  comparation(f8, f8, 'rez43.txt', 'stylish');
  comparation(f7, f8, 'rez51.txt', 'plain');
  comparation(f8, f7, 'rez52.txt', 'plain');
  comparation(f7, f8, 'rez53.txt', 'json');
  comparation(f8, f7, 'rez54.txt', 'json');
//  comparation(f8, f8, 'rez55.txt', 'json');
});
