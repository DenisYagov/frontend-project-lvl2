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

const compareFiles = (file1, file2, format = 'stylish') => {
  // check if all data presented
  if (file1 === undefined) return '';
  // make objects
  const obj1 = getObjectFromFile(file1);
  const obj2 = getObjectFromFile(file2);

  return makeStringFromArray(format, compareObjects(obj1, obj2));
};

export default compareFiles;
