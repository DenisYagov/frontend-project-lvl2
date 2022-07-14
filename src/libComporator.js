// Library functions based object comparation
import _ from 'lodash';
import {
  ADD, DEL, UPTADD, UPTDEL, KEEP,
} from './constants.js';

// eslint-disable-next-line max-len, no-nested-ternary
const keySorting = (a, b) => ((a.key < b.key) ? -1 : (a.key > b.key) ? 1 : 0);
/*
const objKeySort = (obj) => {
  // transformation of the object to [operation, {key: value}] array, sorted by key
  if (!_.isObject(obj)) return obj;
  // we having the object
  const outArr = Object.keys(obj)
    .reduce((acc, key) => {
      const outObj = {};
      outObj[`${key}`] = objKeySort(obj[key]);
      acc.push([KEEP, outObj]);
      return acc;
    }, [])
    .sort((a, b) => keySorting(a, b));
  return outArr;
};
*/
const objKeySort = (obj) => {
  // transformation of the object to [{type : opType, key : key, value: value} ... {}]
  // array, sorted by key
  if (!_.isObject(obj)) return obj;
  // we having the object
  const outArr = Object.keys(obj)
    .reduce((acc, key) => {
      acc.push({ type: KEEP, key: `${key}`, value: objKeySort(obj[key]) });
      return acc;
    }, [])
    .sort((a, b) => keySorting(a, b));
  return outArr;
};
/*
const processUniqArray = (diffArr, obj, opType) => {
  const outArr = diffArr.map((key) => {
    const outObj = {};
    outObj[`${key}`] = objKeySort(obj[key]);
    const out = [opType, outObj];
    return out;
  });
  return outArr;
};
*/
const processUniqArray = (diffArr, obj, opType) => {
  const outArr = diffArr.map((mapKey) => {
    const outObj = {
      type: opType,
      key: mapKey,
      value: objKeySort(obj[mapKey]),
    };
    return outObj;
  });
  return outArr;
};
/*
const processCommonArray = (obj1, obj2, acc, key) => {
  if (!_.isObject(obj1[key]) || (!_.isObject(obj2[key]))) {
    const outObj1 = {};
    outObj1[`${key}`] = objKeySort(obj1[key]);
    // in case values are same
    if (obj1[key] === obj2[key]) {
      acc.push([KEEP, outObj1]);
      return acc;
    }
    // otherwise values are different
    outObj1[`${key}`] = objKeySort(obj1[key]);
    acc.push([UPTDEL, outObj1]);
    const outObj2 = {};
    outObj2[`${key}`] = objKeySort(obj2[key]);
    acc.push([UPTADD, outObj2]);
    return acc;
  }
  // in case obj1[key] and obj2[key] are objects
  const outObj1 = {};
  // eslint-disable-next-line no-use-before-define
  outObj1[`${key}`] = generateRezultArray(obj1[key], obj2[key], '');
  acc.push([KEEP, outObj1]);
  return acc;
};
*/
const processCommonArray = (obj1, obj2, acc, inputKey) => {
  if (!_.isObject(obj1[inputKey]) || (!_.isObject(obj2[inputKey]))) {
    const outObj1 = {};
    outObj1[`${inputKey}`] = objKeySort(obj1[inputKey]);
    // in case values are same
    if (obj1[inputKey] === obj2[inputKey]) {
      acc.push({ type: KEEP, key: inputKey, value: obj1[inputKey] });
      return acc;
    }
    // otherwise values are different
    acc.push({ type: UPTDEL, key: inputKey, value: objKeySort(obj1[inputKey]) });
    acc.push({ type: UPTADD, key: inputKey, value: objKeySort(obj2[inputKey]) });
    return acc;
  }
  // in case obj1[key] and obj2[key] are objects
  const outObj1 = {};
  // eslint-disable-next-line no-use-before-define
  outObj1[`${inputKey}`] = generateRezultArray(obj1[inputKey], obj2[inputKey]);
  acc.push({
    type: KEEP,
    key: inputKey,
    // eslint-disable-next-line no-use-before-define
    value: generateRezultArray(obj1[inputKey], obj2[inputKey]),
  });
  return acc;
};

const generateRezultArray = (obj1, obj2) => {
  // eslint-disable-next-line max-len
  // find the removed items in flat array
  const tempRemovedArr = _.difference(Object.keys(obj1), Object.keys(obj2));
  const removedArr = processUniqArray(tempRemovedArr, obj1, DEL);
  // find the added items in flat array
  const tempAddedArr = _.difference(Object.keys(obj2), Object.keys(obj1));
  const addedArr = processUniqArray(tempAddedArr, obj2, ADD);
  // find the common items in flat array
  const diffArr = _.concat(removedArr, addedArr);
  const tempDiffArr = _.concat(tempRemovedArr, tempAddedArr);
  const commonArr = _.difference(Object.keys(obj1), tempDiffArr)
    .reduce((acc, key) => processCommonArray(obj1, obj2, acc, key), []);
  const outArr = _.concat(diffArr, commonArr)
    // sort array by names
    .sort((a, b) => keySorting(a, b));
  return outArr;
};

const compareObjects = (obj1, obj2) => {
  // make out array
  const outArr = generateRezultArray(obj1, obj2);
  return outArr;
};

export default compareObjects;
export { generateRezultArray, objKeySort };
