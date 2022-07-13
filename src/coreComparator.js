/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import { readFileSync } from 'node:fs';
import { posix } from 'node:path';
import getObjFromString from './fileParsing.js';
import makeStringFromArray from './formatters/index.js';
import compareObjects from './libComporator.js';

// const path = require('node:path');

const getObjectFromFile = (inputFile) => {
  // return object from file
  // make absolut path from any type of input
  const file = posix.resolve(inputFile);
  // get extention of the file
  const fileExt = posix.extname(file);
  const dataStr = readFileSync(file);
  return getObjFromString(dataStr, fileExt);
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
