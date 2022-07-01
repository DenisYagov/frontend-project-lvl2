//import { add, del, upt_add, upt_del, keep } from '../coreComparator.js'
// preSym represents symbols of { add, del, upt_add, upt_del, keep } from '../coreComparator.js'
// it is located at same address offset
const preSym = ['+', '-', '+', '-', ' '];

const ent = String.fromCharCode(10); // enter symbol

const makeOffset = (offset) => {return `${offset}  ` };

const makeStilishString = (inputArray, deep = '') => {
// we receive here just one array element (simple or complex), that need
// to be formatted
return inputArray.reduce((acc, cellArray) => {
if (!Array.isArray(cellArray[2])) {
// we having just a termination
acc += `${deep}${preSym[cellArray[0]]} ${cellArray[1]}: ${cellArray[2]}${ent}`
} else {
// we having the branch
acc +=  `${deep}${preSym[cellArray[0]]} ${cellArray[1]}: {${ent}${makeStilishString(cellArray[2], makeOffset(deep))}${deep}}${ent}`
}
return acc;
}, '');

}

export default makeStilishString