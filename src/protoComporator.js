/* eslint-disable no-nested-ternary */
/* eslint-disable no-use-before-define */
// Potoritary functions based object comparation
import isString from './stringCheck.js';

import {
  add, del, uptAdd, uptDel, keep,
} from './constants.js';

const isKeyPresent = (key, obj) => {
  // checking the presentanse of key in object by filtering
  if (Object.keys(obj).filter((value) => (value === key)).length > 0) return true;
  return false;
};

// in case value of the object is null need to switch it to string 'null'
// otherwise return value as is
const isNullToString = (val) => {
  if (val === null) return 'null';
  return val;
};

const pushDiffValueObject = (key, val1, val2, arr) => {
  arr.push([uptDel, key, isNullToString(val1)]);
  arr.push([uptAdd, key, isNullToString(val2)]);
  return arr;
};

const findCommon = (obj1, obj2, inputArray) => {
  // checking the same keys in the objects
  const outArr = Object.keys(obj1).reduce((acc, key) => {
    // in case key is not common - return current acc
    if (!isKeyPresent(key, obj2)) return acc;
    // in case key common check if value is the same and push the result
    if (isString(obj1[key])) {
    // this is leaf
      return leafProcessing(obj1, obj2, key, acc);
    }
    // !!!! in case object inside
    if (!isString(obj2[key])) {
      acc.push([keep, key, compareObjects(obj1[key], obj2[key], del)]);
      return acc;
    }
    // in case second object is one string
    pushDiffValueObject(key, compareObjects(obj1[key], {}, keep), obj2[key], acc);
    return acc;
  }, inputArray);
  return outArr;
};

const findUniue = (obj1, obj2, inputArray, opType = del) => {
  //  checking the keys in obj1 that absent in obj2
  // encrease the level of tabulation:
  const outArr = Object.keys(obj1).reduce((acc, key) => {
  // check if key present in both
    if (isKeyPresent(key, obj2)) return acc;
    // in case obj1 has unique key
    if (isString(obj1[key])) {
    // this is leaf
      acc.push([opType, key, isNullToString(obj1[key])]);
      return acc;
      // !!!! in case object inside
    }
    acc.push([opType, key, compareObjects(obj1[key], {}, keep)]);
    return acc;
  }, inputArray);
  return outArr;
};

const generateRezultArray = (obj1, obj2, opType) => {
  // eslint-disable-next-line max-len
  const outArr = findCommon(obj1, obj2, findUniue(obj1, obj2, findUniue(obj2, obj1, [], add), opType));
  return outArr;
};

const compareObjects = (obj1, obj2, opType = del) => {
  // make out array
  const outArr = generateRezultArray(obj1, obj2, opType)
  // sort array by names
    .sort((a, b) => {
      const outInt = (a[1] < b[1] ? -1 : (a[1] > b[1] ? 1 : 0));
      return outInt;
    });
  return outArr;
};

const leafProcessing = (obj1, obj2, key, acc) => {
  // function to simplify findCommon.
  // compares two leafs
  if (obj1[key] === obj2[key]) {
    // in case key values are same
    acc.push([keep, key, isNullToString(obj1[key])]);
    return acc;
  }
  // in case key values are different
  if (isString(obj2[key])) {
    // in case obj1[key] is leaf and obj2[key] is leaf just process as replacement
    return pushDiffValueObject(key, isNullToString(obj1[key]), isNullToString(obj2[key]), acc);
  }
  // in case obj1[key] is leaf and obj2[key] is NOT leaf we need to
  // push old parameter value
  // and copy obj2[key] tree
  return pushDiffValueObject(key, obj1[key], compareObjects({}, obj2[key], keep), acc);
};

export default compareObjects;
