// Library functions based object comparation
import _ from 'lodash';
import {
  ADD, DEL, CHANGED, KEEP,
} from './constants.js';

// eslint-disable-next-line max-len, no-nested-ternary
// const keySorting = (a, b) => ((a.key < b.key) ? -1 : (a.key > b.key) ? 1 : 0);

const objKeySort = (obj) => {
  // transformation of the object to [{type : opType, key : key, value: value} ... {}]
  // array, sorted by key
  if (!_.isObject(obj)) return obj;
  // we having the object
  const outArr = Object.keys(obj)
    .reduce((acc, key) => {
      acc.push({ type: KEEP, key: `${key}`, value: objKeySort(obj[key]) });
      return acc;
    }, []);
    // .sort((a, b) => keySorting(a, b));
  return _.sortBy(outArr, ['key']);
};

const processUniq = (obj, cKey, opType) => {
  const outObj = {
    type: opType,
    key: cKey,
    value: objKeySort(obj[cKey]),
  };
  return outObj;
};

const processCommon = (obj1, obj2, inputKey) => {
  if (!_.isObject(obj1[inputKey]) || (!_.isObject(obj2[inputKey]))) {
    const outObj1 = {};
    outObj1[`${inputKey}`] = objKeySort(obj1[inputKey]);
    // in case values are same
    if (obj1[inputKey] === obj2[inputKey]) {
      return { type: KEEP, key: inputKey, value: obj1[inputKey] };
    }
    // otherwise values are different
    return {
      type: CHANGED,
      key: inputKey,
      oldValue: objKeySort(obj1[inputKey]),
      newValue: objKeySort(obj2[inputKey]),
    };
  }
  // in case obj1[key] and obj2[key] are objects
  return {
    type: KEEP,
    key: inputKey,
    // eslint-disable-next-line no-use-before-define
    value: generateRezultArray(obj1[inputKey], obj2[inputKey]),
  };
};

const isPresent = (obj, key) => Object.keys(obj).filter((cellKey) => (cellKey === key)).length;

const generateRezultArray = (obj1, obj2) => {
  const outArr = _.union(Object.keys(obj1), Object.keys(obj2))
    .map((cell) => {
      const presentanceCase = isPresent(obj1, cell) + (2 * isPresent(obj2, cell));
      switch (presentanceCase) {
        case (1):
          // deleted
          return processUniq(obj1, cell, DEL);
        case (2):
          // added
          return processUniq(obj2, cell, ADD);
        case (3):
          // modified or kept
          return processCommon(obj1, obj2, cell);
        default:
          throw new Error('Ooops! cell = ', cell, ' obj1 = ', obj1, ' obj2 = ', obj2);
      }
    });
  return _.sortBy(outArr, ['key']);
};

export default generateRezultArray;
export { objKeySort };
