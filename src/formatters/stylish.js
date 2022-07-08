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
  console.log('inputArray = ', inputArray);
  const outStr = inputArray.reduce((acc, cellArray) => {
    const currentCellValue = Object.values(cellArray[1])[0];
    const preString = `${deep}${preSym[cellArray[0]]} ${Object.keys(cellArray[1])[0]}: `;
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
/*
const proecssStylishString = (inputArray, deep = '') => {
  // make Stylish format
  const outStr = inputArray.reduce((acc, cellArray) => {
    if (!Array.isArray(cellArray[2])) {
    // we having just a termination
      acc += `${deep}${preSym[cellArray[0]]} ${cellArray[1]}: ${cellArray[2]}${ent}`;
    } else {
    // we having the branch
      acc += `${deep}${preSym[cellArray[0]]} ${cellArray[1]}:
      {${ent}${proecssStylishString(cellArray[2], makeOffset(deep))}${deep}}${ent}`;
    }
    return acc;
  }, '');
  return outStr;
};
*/
// removes last enter symbol after proecssStylishString procedure
const makeStilishString = (inputArray) => {
  const outStr = proecssStylishString(inputArray).slice(0, -1);
  return outStr;
};

export default makeStilishString;
