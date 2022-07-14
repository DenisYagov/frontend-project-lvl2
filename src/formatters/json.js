const preSym = [
  '/nadded parameter',
  '/ndeleted parameter',
  '/nnew key: value',
  '/nparameter was updated old key: value',
  '/nparameter was kept'];

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

const startingString = (cellArray) => {
  const currentKey = cellArray.key;
  const outStr = `"${preSym[cellArray.type]}" "${currentKey}": `;
  return outStr;
};

const processJsonString = (inputArray) => {
// make Stylish format
  const outStr = inputArray.reduce((acc, cellArray) => {
    const currentValue = cellArray.value;
    if (!Array.isArray(currentValue)) {
    // we having just a termination
      // eslint-disable-next-line no-param-reassign
      acc += `${startingString(cellArray)}${formatOutputValue(currentValue)},`;
    } else {
    // we having the branch
      // eslint-disable-next-line no-param-reassign
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
