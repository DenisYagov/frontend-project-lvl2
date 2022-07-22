import { readFileSync } from 'node:fs';
import path, { posix } from 'node:path';
import parcingFromString from './fileParsing.js';
import makeStringFromArray from './formatters/index.js';
// eslint-disable-next-line import/no-named-as-default
import generateRezultArray from './libComporator.js';

// const path = require('node:path');

const getObjectFromFile = (inputFilePath) => {
  // return object from file
  // make absolut path from any type of input
  // const absolutFilePath = posix.resolve(inputFilePath);
  const absolutFilePath = path.resolve(process.cwd(), inputFilePath);
  // path.resolve(process.cwd(), filePath)
  // get extention of the file
  const fileExt = posix.extname(absolutFilePath).slice(1);
  const dataStr = readFileSync(absolutFilePath, 'utf-8');
  // const dataStr = readFileSync(inputFilePath);
  return parcingFromString(dataStr, fileExt);
};

const compareFiles = (file1, file2, format = 'stylish') => {
  // check if all data presented
  // if (file1 === undefined) throw new Error('absent file in input data!');
  // make objects
  const obj1 = getObjectFromFile(file1);
  const obj2 = getObjectFromFile(file2);

  return makeStringFromArray(format, generateRezultArray(obj1, obj2));
};

export default compareFiles;
