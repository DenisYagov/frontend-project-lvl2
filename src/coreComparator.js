/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import { readFileSync } from 'fs';
import getObjFromString from './fileParsing.js';
import makeStringFromArray from './formatters/index.js';
import compareObjects from './libComporator.js';

const getObjectFromFile = (file) => {
  // return object from file
  // get extention of file via splitting to two parts by '.' symbal and return second
  // value of array
  const fileExt = file.split('.', 2)[1];
  const dataStr = readFileSync(file);
  // in case yml file on input return parse yml type file
  if ((fileExt === 'yml') || (fileExt === 'yaml')) {
    return getObjFromString(dataStr, 'yml');
  }
  // in case it wasnt yml file return parsing of json file
  return getObjFromString(dataStr, 'json');
};

const compareFiles = (rawData) => {
  // check if all data presented
  if (rawData.args[0] === undefined) return '';
  // make objects
  const obj1 = getObjectFromFile(rawData.args[0]);
  const obj2 = getObjectFromFile(rawData.args[1]);
  console.log('rawData._optionValues.format = ', rawData._optionValues.format);

  return makeStringFromArray(rawData._optionValues.format, compareObjects(obj1, obj2));
};

export default compareFiles;
