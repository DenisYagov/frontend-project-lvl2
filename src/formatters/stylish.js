/* eslint-disable no-param-reassign */
// preSym represents symbols of { add, del, uptAdd, uptDel, keep } from '../coreComparator.js'

// it is located at same address offset
const preSym = ['+', '-', '+', '-', ' '];

const ent = String.fromCharCode(10); // enter symbol

const makeOffset = (offset) => {
  const outStr = `${offset}${String.fromCharCode(9)}`;
  return outStr;
};

const proecssStylishString = (inputArray, deep = '') => {
  // make Stylish format
  const outStr = inputArray.reduce((acc, cellArray) => {
    const currentCellValue = cellArray.value;
    const preString = `${deep}${preSym[cellArray.type]} ${cellArray.key}: `;
    if (!Array.isArray(currentCellValue)) {
    // we having just a termination
      acc += `${preString}${currentCellValue}${ent}`;
    } else {
      acc += `${preString}{${ent}${proecssStylishString(currentCellValue, makeOffset(deep))}${deep}}${ent}`;
    }
    return acc;
  }, '');
  return outStr;
};

// removes last enter symbol after proecssStylishString procedure
const makeStilishString = (inputArray) => {
  const outStr = proecssStylishString(inputArray).slice(0, -1);
  return outStr;
};

export default makeStilishString;
