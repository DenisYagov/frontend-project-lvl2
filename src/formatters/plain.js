import {
  add, del, uptAdd, uptDel, keep,
} from '../constants.js';
// preSym represents symbols of { add, del, uptAdd, uptDel, keep } from '../coreComparator.js'
// it is located at same address offset
const CoreString = ['was added with value: ', 'was removed', ' to ', 'was updated. From ', ' '];

const ent = String.fromCharCode(10); // enter symbol

const complexValueString = (value) => {
  if (value === null) return null;
  if (!Array.isArray(value)) {
    // in case we heving empty string as argument return double queotes
    // or in case value is Strig we have to return value between quote simbols
    if ((value === '') || (value.length > 1)) return `'${value}'`;
    return value;
  }
  return '[complex value]';
};

const plainString = (cellArray, PropertyName) => {
  // string in plain format output
  const currentValue = Object.values(cellArray[1])[0];
  const currentKey = Object.keys(cellArray[1])[0];
  // in most cases this will be the common starting:
  const startingString = `'${`${PropertyName}.${currentKey}' ${CoreString[cellArray[0]]}`.slice(1)}`;
  const val = complexValueString(currentValue);
  switch (cellArray[0]) {
    case add: return `Property ${startingString}${val}${ent}`;
    case del: return `Property ${startingString}${ent}`;
    case uptDel: return `Property ${startingString}${val}`;
    case uptAdd: return `${CoreString[cellArray[0]]}${val}${ent}`;
    case keep: return '';
    default: throw new Error('unexpected situation Error. Incoming type of operation is out of range');
  }
};

const proecssPlainString = (inputArray, PropertyName = '') => {
  // make plain format
  const outStr = inputArray.reduce((acc, cellArray) => {
    const currentValue = Object.values(cellArray[1])[0];
    const currentKey = Object.keys(cellArray[1])[0];
    if (!Array.isArray(currentValue)) {
      // we having just a termination
      return (acc + plainString(cellArray, PropertyName));
    }
    // we having the branch
    // in case we having just a value to keep, we have to check operations
    // inside of branch
    if (cellArray[0] === keep) {
      return (acc + proecssPlainString(currentValue, `${PropertyName}.${currentKey}`));
    }
    // otherwise we just add the string
    return (acc + plainString(cellArray, PropertyName));
  }, '');
  return outStr;
};

/*
const proecssPlainString = (inputArray, PropertyName = '') => {
// make Stylish format
  const outStr = inputArray.reduce((acc, cellArray) => {
    if (!Array.isArray(cellArray[2])) {
      // we having just a termination
      return (acc + plainString(cellArray, PropertyName));
    }
    // we having the branch
    // in case we having just a value to keep, we have to check operations
    // inside of branch
    if (cellArray[0] === keep) {
      return (acc + proecssPlainString(cellArray[2], `${PropertyName}.${cellArray[1]}`));
    }
    // otherwise we just add the string
    return (acc + plainString(cellArray, PropertyName));
  }, '');
  return outStr;
};
*/
// removes last enter symbol after proecssStylishString procedure
const makePlainString = (inputArray) => {
  const outStr = proecssPlainString(inputArray).slice(0, -1);
  return outStr;
};

export default makePlainString;
