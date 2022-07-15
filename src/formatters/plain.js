import {
  ADD, DEL, CHANGED, KEEP,
} from '../constants.js';
// preSym represents symbols of { add, del, uptAdd, uptDel, keep } from '../coreComparator.js'
// it is located at same address offset
const CoreString = ['was added with value: ', 'was removed', 'was updated. From ', ' '];

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
  const currentKey = cellArray.key;
  // in most cases this will be the common starting:
  const startingString = `'${`${PropertyName}.${currentKey}' ${CoreString[cellArray.type]}`.slice(1)}`;
  switch (cellArray.type) {
    case ADD: {
      const val = complexValueString(cellArray.value);
      return `Property ${startingString}${val}${ent}`; }
    case DEL: {
      return `Property ${startingString}${ent}`; }
    case CHANGED: {
      const oldVal = complexValueString(cellArray.oldValue);
      const newVal = complexValueString(cellArray.newValue);
      return `Property ${startingString}${oldVal} to ${newVal}${ent}`;
    }
    // case UPTADD: return `${CoreString[cellArray.type]}${val}${ent}`;
    case KEEP: return '';
    default: throw new Error('unexpected situation Error. Incoming type of operation is out of range');
  }
};

const proecssPlainString = (inputArray, PropertyName = '') => {
  // make plain format
  const outStr = inputArray.reduce((acc, cellArray) => {
    const currentValue = cellArray.value;
    const currentKey = cellArray.key;
    if (!Array.isArray(currentValue)) {
      // we having just a termination
      return (acc + plainString(cellArray, PropertyName));
    }
    // we having the branch
    // in case we having just a value to keep, we have to check operations
    // inside of branch
    if (cellArray.type === KEEP) {
      return (acc + proecssPlainString(currentValue, `${PropertyName}.${currentKey}`));
    }
    // otherwise we just add the string
    return (acc + plainString(cellArray, PropertyName));
  }, '');
  return outStr;
};

// removes last enter symbol after proecssStylishString procedure
const makePlainString = (inputArray) => {
  const outStr = proecssPlainString(inputArray).slice(0, -1);
  return outStr;
};

export default makePlainString;
