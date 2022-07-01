// preSym represents symbols of { add, del, upt_add, upt_del, keep } from '../coreComparator.js'
// it is located at same address offset
const preSym = ['+', '-', '+', '-', ' '];

const ent = String.fromCharCode(10); // enter symbol

const makeOffset = (offset) => {return `${offset}  ` };

const proecssStylishString = (inputArray, deep = '') => {
// make Stylish format
    return inputArray.reduce((acc, cellArray) => {
    if (!Array.isArray(cellArray[2])) {
    // we having just a termination
    acc += `${deep}${preSym[cellArray[0]]} ${cellArray[1]}: ${cellArray[2]}${ent}`
    } else {
    // we having the branch
    acc +=  `${deep}${preSym[cellArray[0]]} ${cellArray[1]}: {${ent}${proecssStylishString(cellArray[2], makeOffset(deep))}${deep}}${ent}`
    }
    return acc;
    }, '')
    }
    
// removes last enter symbol after proecssStylishString procedure
const makeStilishString = (inputArray) => {return proecssStylishString(inputArray).slice(0, -1)}

export default makeStilishString