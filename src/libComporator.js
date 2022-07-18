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
    acc.push({
      type: CHANGED,
      key: inputKey,
      oldValue: objKeySort(obj1[inputKey]),
      newValue: objKeySort(obj2[inputKey]),
    });
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
  const outArr = _.union(Object.keys(obj1), Object.keys(obj2))
    .reduce((acc, currentKey) => {
      if ((_.has(obj1, currentKey)) && (_.has(obj2, currentKey))) {
        // in case both objrcts has same property
        return processCommonArray(obj1, obj2, acc, currentKey);
      }
      if (_.has(obj1, currentKey)) {
        // property was removed
        acc.push(processUniq(obj1, currentKey, DEL));
        return acc;
      }
      // finally property was added
      acc.push(processUniq(obj2, currentKey, ADD));
      return acc;
    }, []);
  return _.sortBy(outArr, ['key']);
};

export default generateRezultArray;
export { objKeySort };
