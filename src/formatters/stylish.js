/* eslint-disable no-param-reassign */
// preSym represents symbols of { ADD, CHANGED, DEL, KEEP } from '../coreComparator.js'

import { ADD, CHANGED, DEL } from '../constants.js';

// it is located at same address offset
const preSym = ['+', '-', '', ' '];

// const ent = String.fromCharCode(10); // enter symbol
const ent = '\n'; // enter symbol

const makeOffset = (offset) => {
  // const outStr = `${offset}${String.fromCharCode(9)}`;
  const outStr = `${offset}  `;
  return outStr;
};

const genString = (deep, Sign, currentCellKey, currentCellValue) => {
  const preString = `${deep}${Sign} ${currentCellKey}: `;
  if (!Array.isArray(currentCellValue)) {
    // we having just a termination
    return `${preString}${currentCellValue}${ent}`;
  }
  // eslint-disable-next-line no-use-before-define
  return `${preString}{${ent}${proecssStylishString(currentCellValue, makeOffset(deep))}${makeOffset(deep)}}${ent}`;
};

const proecssStylishString = (inputArray, deep = '') => {
  // make Stylish format
  const outStr = inputArray.reduce((acc, cellArray) => {
    if (cellArray.type !== CHANGED) {
      // in case ADD DEL or KEEP we have to add 1 string:
      acc += genString(deep, preSym[cellArray.type], cellArray.key, cellArray.value);
    } else {
      // in case CHANGED we have to add 2 strings:
      acc += genString(deep, preSym[DEL], cellArray.key, cellArray.oldValue);
      acc += genString(deep, preSym[ADD], cellArray.key, cellArray.newValue);
    }
    return acc;
  }, '');
  return outStr;
};

// removes last enter symbol after proecssStylishString procedure
const makeStilishString = (inputArray) => {
  const outStr = `{${ent}${proecssStylishString(inputArray).slice(0, -1)}${ent}}`;
  return outStr;
};

export default makeStilishString;
