import getObjFromFile from './fileParsing.js';

const isKeyPresent = (key, obj) => {
  // checking the presentanse of key in object by filtering
  if (Object.keys(obj).filter((value) => (value === key)).length > 0) {
    return true;
  } else { 
    return false }
}

const pushDiffValueObject = (key, val1, val2, arr) => {
  arr.push(['-', key, val1]);
  arr.push(['+', key, val2]);
}

const findCommon = (obj1, obj2, inputArray) => {
  // checking the same keys in the objects
  return Object.keys(obj1).reduce((acc, key) => {
    if (isKeyPresent(key, obj2)) {
      // in case key common check if value is the same and push the result
      (obj1[key] === obj2[key]) ? acc.push([' ', `${key}`, obj1[key]]) : pushDiffValueObject(`${key}`, obj1[key], obj2[key], acc)
    }
    return acc;
  }, inputArray);
}

const findUniue = (obj1, obj2, inputArray, firstSym = '-') => {
  //checking the keys in obj1 that absent in obj2
  return Object.keys(obj1).reduce((acc, key) => {
    if (!isKeyPresent(key, obj2)){
      // in case obj1 has unique key
      acc.push([firstSym, `${key}`, obj1[key]]);
    }
    return acc;
  }, inputArray)
}



const generateRezultArray = (obj1, obj2) => {
  return findCommon(obj1, obj2, findUniue(obj1, obj2, findUniue(obj2, obj1, [], '+')));
}

const flatCompare = (rawData) => {
// check if all data presented
if (rawData.args[0] === undefined) return '';
//make objects
const obj1 = getObjFromFile(rawData.args[0]);
const obj2 = getObjFromFile(rawData.args[1]);
// make out array
const outArr = generateRezultArray(obj1, obj2)
// sort array by names
.sort((a, b) => {return (a[1] < b[1] ? -1 : (a[1] > b[1] ? 1 : 0))})
//make string from array element, that splited to 3 strings
.map((cell) => {
  return cell.join(' ');
});
// make string from array by join via 'enter' symbal
return outArr.join(String.fromCharCode(10));
}

export default flatCompare;