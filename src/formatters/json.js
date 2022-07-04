// preSym represents symbols of { add, del, upt_add, upt_del, keep } from '../coreComparator.js'
// it is located at same address offset
const preSym = ['/nadded parameter', '/ndeleted parameter',
'/nnew key: value', '/nparameter was updated old key: value',
'/nparameter was kept'];

const formatOutputValue = (value) => {
    // in case value is pure string return string in quotes
    //otherwise return value as is
    if ((!isNaN(value) || (value === null)||
    (value === true) || (value === false))
    && (value !== '')) return value;
    if (value === 'null') return null;
    return `"${value}"`
}

const startingString = (cellArray) => {
    return `"${preSym[cellArray[0]]}" "${cellArray[1]}": `;
}

const processJsonString = (inputArray) => {
// make Stylish format
return inputArray.reduce((acc, cellArray) => {
    if (!Array.isArray(cellArray[2])) {
    // we having just a termination
    acc += `${startingString(cellArray)}${formatOutputValue(cellArray[2])},`
    } else {
    // we having the branch
    acc +=  `${startingString(cellArray)}{${processJsonString(cellArray[2])}}`
    }
    return acc;
    }, '')
}

const makeJsonString = (inputArray) => {
    const out = processJsonString(inputArray);
    if (out[out.length - 1] === ',') return out.slice(0, -1);
    return out;
}

export default makeJsonString;
export { formatOutputValue }