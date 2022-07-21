/* eslint-disable no-undef */
/* eslint-disable max-len */
import { readFileSync } from 'fs';
import compareFiles from '../src/coreComparator.js';
// eslint-disable-next-line import/no-duplicates
import generateRezultArray from '../src/libComporator.js';
// eslint-disable-next-line import/no-duplicates
import { objKeySort } from '../src/libComporator.js';
import {
  ADD, DEL, CHANGED, KEEP,
} from '../src/constants.js';

// processing files:
const f7 = '/__fixtures__/fileBefore1.json';
const f8 = '/__fixtures__/fileBefore2.json';
const f9 = '/__fixtures__/fileBefore1.yaml';
const f10 = '/__fixtures__/fileBefore2.yaml';

const objKeySortParams = [
  [{ c: 0 }, [{ type: KEEP, key: 'c', value: 0 }]],
  [{ a: 0, c: 1 }, [{ type: KEEP, key: 'a', value: 0 }, { type: KEEP, key: 'c', value: 1 }]],
  [{ b: 0, a: 1 },
    [{ type: KEEP, key: 'a', value: 1 }, { type: KEEP, key: 'b', value: 0 }]],
  [{ a: 0, b: { c: 1 } },
    [{ type: KEEP, key: 'a', value: 0 },
      { type: KEEP, key: 'b', value: [{ type: KEEP, key: 'c', value: 1 }] }]],
  [{ abcd: '11', b: { camp: 1, d: 3333333 } },
    [{ type: KEEP, key: 'abcd', value: '11' },
      {
        type: KEEP,
        key: 'b',
        value: [{ type: KEEP, key: 'camp', value: 1 },
          { type: KEEP, key: 'd', value: 3333333 }],
      }]],
  [{ arrow: '0', b: { d: 88, c: 3 } },
    [{ type: KEEP, key: 'arrow', value: '0' },
      {
        type: KEEP,
        key: 'b',
        value: [{ type: KEEP, key: 'c', value: 3 },
          { type: KEEP, key: 'd', value: 88 }],
      }]],
  [{ b: 0, a: { d: 1, c: 3 } },
    [
      {
        type: KEEP,
        key: 'a',
        value: [{ type: KEEP, key: 'c', value: 3 },
          { type: KEEP, key: 'd', value: 1 }],
      },
      { type: KEEP, key: 'b', value: 0 }]],
  [{ e: 33, b: 0, a: { d: 1, c: 3 } },
    [{
      type: KEEP,
      key: 'a',
      value: [{ type: KEEP, key: 'c', value: 3 },
        { type: KEEP, key: 'd', value: 1 }],
    },
    { type: KEEP, key: 'b', value: 0 },
    { type: KEEP, key: 'e', value: 33 }]],
];

test.each(objKeySortParams)('.objKeySort(%o) => %o', async (param, expected) => {
  console.log('objKeySort(param) = ', objKeySort(param));
  expect(objKeySort(param)).toEqual(expected);
});

const generateRezultArrayParams = [
  [{ a: 0 }, {}, [{ type: DEL, key: 'a', value: 0 }]],
  [{ a: 0 }, { a: 1 },
    [{
      type: CHANGED, key: 'a', oldValue: 0, newValue: 1,
    }],
    [{ a: 1 }, { a: 1 },
      [{ type: KEEP, key: 'a', value: 1 }]],
    [{ a: '1' }, { a: 1 },
      [{
        type: CHANGED, key: 'a', oldValue: '1', newValue: 1,
      }]],
    [{ a: '1' }, { a: '1' },
      [{ type: KEEP, key: 'a', value: '1' }]],
    [{ a: 0 }, { b: 1 },
      [{ type: DEL, key: 'a', value: 0 },
        { type: ADD, key: 'b', value: 1 }]],
    [{ a: 0, c: 3 }, { b: 1 },
      [{ type: DEL, key: 'a', value: 0 },
        { type: ADD, key: 'b', value: 1 },
        { type: DEL, key: 'c', value: 3 }]],
    [{ c: { d: 3 } }, { c: 4 },
      [
        {
          type: CHANGED,
          key: 'c',
          oldValue: [{ type: KEEP, key: 'd', value: 3 }],
          newValue: 4,
        }]],
    [{ c: 4 }, { c: { d: 4 } },
      [{
        type: CHANGED,
        key: 'c',
        oldValue: 4,
        newValue: [{ type: KEEP, key: 'd', value: 4 },
        ],
      }]],
    [{ c: { d: 3 } }, { c: { d: 4 } },
      [{
        type: KEEP,
        key: 'c',
        value: [
          {
            type: CHANGED, key: 'd', oldValue: 3, newValue: 4,
          }],
      }]],
    [{ a: 1, c: { d: 3 } }, { c: { d: 4 } },
      [{ type: DEL, key: 'a', value: 1 },
        {
          type: KEEP,
          key: 'c',
          value: [{
            type: CHANGED, key: 'd', oldValue: 3, newValue: 4,
          }],
        }]],
    [{ cyber: { d: 3 } }, { avalon: 1, cyber: { d: 4 } },
      [{ type: ADD, key: 'avalon', value: 1 },
        {
          type: KEEP,
          key: 'cyber',
          value: [{
            type: CHANGED, key: 'd', oldValue: 3, newValue: 4,
          }],
        }]],
  ]];

test.each(generateRezultArrayParams)('compare objects %o and %o', (obj1, obj2, rez) => {
  expect(generateRezultArray(obj1, obj2, '')).toEqual(rez);
});

const comparationParams = [
  [f7, f8, 'fileAfter1_2.txt'],
  [f8, f7, 'fileAfter1_1.txt'],
  [f9, f10, 'fileAfter1_4.txt'],
  [f10, f9, 'fileAfter1_5.txt'],
  [f8, f8, 'fileAfter1_3.txt'],
  [f10, f10, 'fileAfter1_3.txt'],
  [f10, f8, 'fileAfter1_3.txt'],
  [f7, f8, 'fileAfter1_2.txt', 'stylish'],
  [f8, f7, 'fileAfter1_1.txt', 'stylish'],
  [f9, f10, 'fileAfter1_4.txt', 'stylish'],
  [f8, f8, 'fileAfter1_3.txt', 'stylish'],
  [f7, f8, 'fileAfter2_1.txt', 'plain'],
  [f8, f7, 'fileAfter2_2.txt', 'plain'],
  [f7, f8, 'fileAfter3_1.txt', 'json'],
  [f8, f7, 'fileAfter3_2.txt', 'json'],
];

test.each(comparationParams)('compare multylevel multyformat files %s, %s', async (file1, file2, eqFile, f = '') => {
  const rez1 = readFileSync(`./__fixtures__/${eqFile}`).toString();
  expect(compareFiles(file1, file2, f)).toBe(rez1);
});

const str = JSON.parse('{"/nparameter was kept": {"common": {"/nadded parameter": {"follow": false},"/nparameter was kept": {"setting1": "Value 1"},"/ndeleted parameter": {"setting2": 200},"/nparameter was updated old key: value": {"setting3": true},"/nnew key: value": {"setting3": null},"/nadded parameter": {"setting4": "blah blah"},"/nadded parameter": {"setting5": {"/nparameter was kept": {"key5": "value5"}}},"/nparameter was kept": {"setting6": {"/nparameter was kept": {"doge": {"/nparameter was updated old key: value": {"wow": ""},"/nnew key: value": {"wow": "so much"}}},"/nparameter was kept": {"key": "value"},"/nadded parameter": {"ops": "vops"}}}}},"/nparameter was kept": {"group1": {"/nparameter was updated old key: value": {"baz": "bas"},"/nnew key: value": {"baz": "bars"},"/nparameter was kept": {"foo": "bar"},"/nparameter was updated old key: value": {"nest": {"/nparameter was kept": {"key": "value"}}},"/nnew key: value": {"nest": "str"}}},"/ndeleted parameter": {"group2": {"/nparameter was kept": {"abc": 12345},"/nparameter was kept": {"deep": {"/nparameter was kept": {"id": 45}}}}},"/nadded parameter": {"group3": {"/nparameter was kept": {"deep": {"/nparameter was kept": {"id": {"/nparameter was kept": {"number": 45}}}}},"/nparameter was kept": {"fee": 100500}}}}');
console.log('str = ', str);
