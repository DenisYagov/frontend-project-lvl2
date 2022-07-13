/* eslint-disable no-restricted-globals */
/* eslint-disable use-isnan */
/* eslint-disable no-param-reassign */
// preSym represents symbols of { add, del, uptAdd, uptDel, keep } from '../coreComparator.js'
// it is located at same address offset
/* const preSym = ['/nadded parameter', '/ndeleted parameter',
  '/nnew key: value', '/nparameter was updated old key: value',
  '/nparameter was kept']; */
const preSym = ['/nadded parameter', '/ndeleted parameter', '/nnew key: value', '/nparameter was updated old key: value', '/nparameter was kept'];

const formatOutputValue = (value) => {
  // in case value is pure string return string in quotes
  // otherwise return value as is
  if ((!isNaN(value) || (value === null)
  // if (((value === NaN) || (value === null)
  || (value === true) || (value === false))
    && (value !== '')) return value;
  if (value === 'null') return null;
  return `"${value}"`;
};

const startingString = (cellArray) => {
  const currentKey = Object.keys(cellArray[1])[0];
  const outStr = `"${preSym[cellArray[0]]}" "${currentKey}": `;
  return outStr;
};

const processJsonString = (inputArray) => {
// make Stylish format
  const outStr = inputArray.reduce((acc, cellArray) => {
    const currentValue = Object.values(cellArray[1])[0];
    if (!Array.isArray(currentValue)) {
    // we having just a termination
      acc += `${startingString(cellArray)}${formatOutputValue(currentValue)},`;
    } else {
    // we having the branch
      acc += `${startingString(cellArray)}{${processJsonString(currentValue)}}`;
    }
    return acc;
  }, '');
  return outStr;
};

const makeJsonString = (inputArray) => {
  const out = processJsonString(inputArray);
  if (out[out.length - 1] === ',') return out.slice(0, -1);
  return out;
};

export default makeJsonString;
export { formatOutputValue };
