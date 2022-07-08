/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
// Library functions based object comparation
import _ from 'lodash';
import {
  add, del, uptAdd, uptDel, keep,
} from './constants.js';

const objKeySort = (obj) => {
  // transformation of the object to [operation, {key: value}] array, sorted by key
  if (!_.isObject(obj)) return obj;
  // we having the object
  const outArr = Object.keys(obj)
    .reduce((acc, key) => {
      const outObj = {};
      outObj[`${key}`] = objKeySort(obj[key]);
      acc.push([keep, outObj]);
      return acc;
    }, [])
    .sort((a, b) => {
      const outInt = (Object.keys(a[1])[0] < Object.keys(b[1])[0]) ? -1 : (((Object.keys(a[1])[0] > Object.keys(b[1])[0]) ? 1 : 0));
      return outInt;
    });
  return outArr;
};

const generateRezultArray = (obj1, obj2) => {
  // eslint-disable-next-line max-len
  // find the removed items in flat array
  const tempRemovedArr = _.difference(Object.keys(obj1), Object.keys(obj2));
  const removedArr = tempRemovedArr.map((key) => {
    const outObj = {};
    outObj[`${key}`] = objKeySort(obj1[key]);
    const out = [del, outObj];
    return out;
  });
  // find the added items in flat array
  const tempAddedArr = _.difference(Object.keys(obj2), Object.keys(obj1));
  const addedArr = tempAddedArr.map((key) => {
    const outObj = {};
    outObj[`${key}`] = objKeySort(obj2[key]);
    const out = [add, outObj];
    return out;
  });
  // find the common items in flat array
  const diffArr = _.concat(removedArr, addedArr);
  const tempDiffArr = _.concat(tempRemovedArr, tempAddedArr);
  const commonArr = _.difference(Object.keys(obj1), tempDiffArr)
    .reduce((acc, key) => {
      if (!_.isObject(obj1[key]) || (!_.isObject(obj2[key]))) {
        const outObj1 = {};
        outObj1[`${key}`] = objKeySort(obj1[key]);
        // in case values are same
        if (obj1[key] === obj2[key]) {
          acc.push([keep, outObj1]);
          return acc;
        }
        // otherwise values are different
        outObj1[`${key}`] = objKeySort(obj1[key]);
        acc.push([uptDel, outObj1]);
        const outObj2 = {};
        outObj2[`${key}`] = objKeySort(obj2[key]);
        acc.push([uptAdd, outObj2]);
        return acc;
      }
      // in case obj1[key] and obj2[key] are objects
      const outObj1 = {};
      outObj1[`${key}`] = generateRezultArray(obj1[key], obj2[key], '');
      acc.push([keep, outObj1]);
      return acc;
    }, []);
  const outArr = _.concat(diffArr, commonArr)
    // sort array by names
    .sort((a, b) => {
      const outInt = (Object.keys(a[1])[0] < Object.keys(b[1])[0]) ? -1 : (((Object.keys(a[1])[0] > Object.keys(b[1])[0]) ? 1 : 0));
      return outInt;
    });

  return outArr;
};

const compareObjects = (obj1, obj2) => {
  // make out array
  const outArr = generateRezultArray(obj1, obj2);
  return outArr;
};

export default compareObjects;
export { generateRezultArray, objKeySort };
