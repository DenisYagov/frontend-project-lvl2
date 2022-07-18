import { CHANGED } from '../constants.js';

const preSym = [
  '/nadded parameter',
  '/ndeleted parameter',
  '/nparameter was updated old key: value',
  '/nparameter was kept'];

//   '/nnew key: value',

const formatOutputValue = (value) => {
  // in case value is pure string return string in quotes
  // otherwise return value as is
  // eslint-disable-next-line no-restricted-globals
  if ((!isNaN(value) || (value === null)
  // if (((value === NaN) || (value === null)
  || (value === true) || (value === false))
    && (value !== '')) return value;
  if (value === 'null') return null;
  return `"${value}"`;
};

const startingString = (sym, currentKey) => {
  const outStr = `"${sym}": {"${currentKey}": `;
  return outStr;
};

const growJsonAcc = (sym, key, currentValue) => {
  if (!Array.isArray(currentValue)) {
    // we having just a termination
    // eslint-disable-next-line no-param-reassign
    return `${startingString(sym, key)}${formatOutputValue(currentValue)}}`;
  }
  // we having the branch
  // eslint-disable-next-line no-param-reassign, no-use-before-define
  return `${startingString(sym, key)}{${processJsonString(currentValue)}}}`;
};

const terminationComma = (len, index, accu) => {
  if ((len - 1) > index) { return `${accu},`; }
  return accu;
};

const processJsonString = (inputArray) => {
// make json format
  const outStr = inputArray.reduce((acc, cellArray, index) => {
    if (cellArray.type === CHANGED) {
      // CHANGED type requires to generate output string twice
      // eslint-disable-next-line no-param-reassign
      acc += `${growJsonAcc(preSym[CHANGED], cellArray.key, cellArray.oldValue)},`;
      // eslint-disable-next-line no-param-reassign
      acc += growJsonAcc('/nnew key: value', cellArray.key, cellArray.newValue);
      // add ',' sing only in case when it is not final element of array
      // if ((inputArray.length - 1) > index) { acc += ','; }
      return terminationComma(inputArray.length, index, acc);
    }
    // oterwise generate one time result string
    // eslint-disable-next-line no-param-reassign
    acc += growJsonAcc(preSym[cellArray.type], cellArray.key, cellArray.value);
    return terminationComma(inputArray.length, index, acc);
  }, '');
  return outStr;
};

const makeJsonString = (inputArray) => {
  const out = processJsonString(inputArray);
  if (out[out.length - 1] === ',') return out.slice(0, -1);
  return `{${out}}`;
};

export default makeJsonString;
export { formatOutputValue };
