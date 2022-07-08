/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import getObjFromFile from './fileParsing.js';
import makeStringFromArray from './formatters/index.js';
import compareObjects from './libComporator.js';

const compareFiles = (rawData) => {
  // check if all data presented
  if (rawData.args[0] === undefined) return '';
  // make objects
  const obj1 = getObjFromFile(rawData.args[0]);
  const obj2 = getObjFromFile(rawData.args[1]);
  console.log('rawData._optionValues.format = ', rawData._optionValues.format);

  return makeStringFromArray(rawData._optionValues.format, compareObjects(obj1, obj2));
};

export default compareFiles;
