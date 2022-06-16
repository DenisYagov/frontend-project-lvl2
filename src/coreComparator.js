import { readFileSync } from 'fs';
import  path from 'path';

const isKeyPresent = (key, obj) => {
  // checking the presentanse of key in object by filtering
  if (Object.keys(obj).filter((value) => (value === key)).length > 0) {
    return true;
  } else { 
    return false }
}

const findCommon = (obj1, obj2, inputArray) => {
  // checking the same keys in the objects
  const outArray = Object.keys(obj1).reduce((acc, key) => {
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
  }, inputArray)

  return outArray;
}

const findUniue = (obj1, obj2, inputArray, firstSym = '-') => {
  //checking the keys in obj1 that absent in obj2
  return Object.keys(obj1).reduce((acc, key) => {
    const tempObj2 = Object.keys(obj2).filter((value) => (value === key));
    if (!isKeyPresent(key, obj2)){
      // in case obj1 has unique key
      acc.push([firstSym, `${key}`, obj1[key]]);
    }
    return acc;
  }, inputArray)
}


const flatCompare = (rawData) => {

if (rawData.args[0] !== undefined) {
const file1 = readFileSync(rawData.args[0]).toString();
const file2 = readFileSync(rawData.args[1]).toString();

//console.log('file1 = ', rawData.args[0]);
//console.log('path.isAbsolute(file1) = ', path.isAbsolute(rawData.args[0]));
//console.log('file2 = ', obj2); 

const obj1 = JSON.parse(file1);
const obj2 = JSON.parse(file2);

const outArr = findCommon(obj1, obj2, findUniue(obj1, obj2, findUniue(obj2, obj1, [], '+')))
.sort((a, b) => {return (a[1] < b[1] ? -1 : (a[1] > b[1] ? 1 : 0))})
.map((cell) => {
  return cell.join(' ');
  //cell.push(rez);
});

const outStr = outArr.join(String.fromCharCode(10));

return outStr;
} else { 
  return '' };
}

export default flatCompare;