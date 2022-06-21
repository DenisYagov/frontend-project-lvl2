import { readFileSync } from 'fs';

const isKeyPresent = (key, obj) => {
  // checking the presentanse of key in object by filtering
  if (Object.keys(obj).filter((value) => (value === key)).length > 0) {
    return true;
  } else { 
    return false }
}

const findCommon = (obj1, obj2, inputArray) => {
  // checking the same keys in the objects
  return Object.keys(obj1).reduce((acc, key) => {
    if (isKeyPresent(key, obj2)) {
      // in case obj1 and obj2 has same key
      if (obj1[key] === obj2[key] ) {
        // keys value in obj1 and obj2 has same value
        acc.push([' ', `${key}`, obj1[key]]);
      } else {
        // keys value in obj1 and obj2 has different value
        acc.push(['-', `${key}`, obj1[key]]);
        acc.push(['+', `${key}`, obj2[key]]);
      }
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

const getObjFromFile = (file) => {return JSON.parse(readFileSync(file).toString());}

const flatCompare = (rawData) => {
// check if all data presented
if (rawData.args[0] === undefined) return '';

//make objects
const obj1 = getObjFromFile(rawData.args[0]);
const obj2 = getObjFromFile(rawData.args[1]);
// make out array
const outArr = findCommon(obj1, obj2, findUniue(obj1, obj2, findUniue(obj2, obj1, [], '+')))
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