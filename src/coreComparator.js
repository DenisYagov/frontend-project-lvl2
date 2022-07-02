import getObjFromFile from './fileParsing.js';
import makeStringFromArray from './formatters/index.js'
import isString from './stringCheck.js';

import  { add, del, upt_add, upt_del, keep } from './constants.js'

const isKeyPresent = (key, obj) => {
  // checking the presentanse of key in object by filtering
  if (Object.keys(obj).filter((value) => (value === key)).length > 0) {
    return true;
  } else { 
    return false }
}

const pushDiffValueObject = (key, val1, val2, arr) => {
  arr.push([upt_del, key, isNullToString(val1)]);
  arr.push([upt_add, key, isNullToString(val2)]);
}

// in case value of the object is null need to switch it to string 'null'
// otherwise return value as is
const isNullToString = (val) => {if (val === null) return 'null'
return val;}

const findCommon = (obj1, obj2, inputArray) => {
  // checking the same keys in the objects
  return Object.keys(obj1).reduce((acc, key) => {
    // in case key is not common - return current acc
    if (!isKeyPresent(key, obj2)) return acc;
    // in case key common check if value is the same and push the result
    if (isString(obj1[key])){
      // this is leaf
      if (obj1[key] === obj2[key]) {
        // in case key values are same
        acc.push([keep, key, isNullToString(obj1[key])])
        return acc;
      }
      //in case key values are different
      if (isString(obj2[key])) {
        // in case obj1[key] is leaf and obj2[key] is leaf just process as replacement 
        pushDiffValueObject(key, isNullToString(obj1[key]), isNullToString(obj2[key]), acc)
        return acc;
      }
      //in case obj1[key] is leaf and obj2[key] is NOT leaf we need to
      //push old parameter value
      //and copy obj2[key] tree
      pushDiffValueObject(key, obj1[key], compareObjects({}, obj2[key], keep), acc)
      return acc;
      }
    // !!!! in case object inside
    if (!isString(obj2[key])) {
      acc.push([keep, key, compareObjects(obj1[key], obj2[key], del)]);
      return acc;
    }
  // in case second object is one string
  pushDiffValueObject(key, compareObjects(obj1[key], {}, keep), obj2[key], acc)
  return acc;
  }, inputArray);
}

const findUniue = (obj1, obj2, inputArray, opType = del) => {
  //checking the keys in obj1 that absent in obj2
  // encrease the level of tabulation:
  return Object.keys(obj1).reduce((acc, key) => {
  // check if key present in both
  if (isKeyPresent(key, obj2)) return acc;
      // in case obj1 has unique key
    if (isString(obj1[key])){
      // this is leaf
      acc.push([opType, key, isNullToString(obj1[key])]);
      return acc;
      // !!!! in case object inside
    }
  acc.push([opType, key, compareObjects(obj1[key], {}, keep)]);
  return acc;
  }, inputArray)
}

const generateRezultArray = (obj1, obj2, opType) => {
  return findCommon(obj1, obj2, findUniue(obj1, obj2, findUniue(obj2, obj1, [], add), opType));
}

const compareFiles = (rawData) => {
  // check if all data presented
if (rawData.args[0] === undefined) return '';
//make objects
const obj1 = getObjFromFile(rawData.args[0]);
const obj2 = getObjFromFile(rawData.args[1]);
/*
console.log('obj1 = ', obj1);
console.log('obj2 = ', obj2);*/
console.log('rawData._optionValues.format = ', rawData._optionValues.format);

return makeStringFromArray(rawData._optionValues.format, compareObjects(obj1, obj2));
 }
//}

const compareObjects = (obj1, obj2, opType = del) => {
// make out array
const outArr = generateRezultArray(obj1, obj2, opType)
// sort array by names
.sort((a, b) => {return (a[1] < b[1] ? -1 : (a[1] > b[1] ? 1 : 0))})
return outArr;
}

export default compareFiles;