/* eslint-disable no-param-reassign */
// preSym represents symbols of { add, del, uptAdd, uptDel, keep } from '../coreComparator.js'
// it is located at same address offset
const preSym = ['+', '-', '+', '-', ' '];

const ent = String.fromCharCode(10); // enter symbol

const makeOffset = (offset) => {
  const outStr = `${offset}  `;
  return outStr;
};

const proecssStylishString = (inputArray, deep = '') => {
  // make Stylish format
  const outStr = inputArray.reduce((acc, cellArray) => {
    if (!Array.isArray(cellArray[2])) {
    // we having just a termination
      acc += `${deep}${preSym[cellArray[0]]} ${cellArray[1]}: ${cellArray[2]}${ent}`;
    } else {
    // we having the branch
      acc += `${deep}${preSym[cellArray[0]]} ${cellArray[1]}: {${ent}${proecssStylishString(cellArray[2], makeOffset(deep))}${deep}}${ent}`;
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
