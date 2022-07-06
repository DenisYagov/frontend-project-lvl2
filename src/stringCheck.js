/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-globals */
const isString = (obj) => {
  // return true if object is string
  if ((obj === undefined) || (obj === null) || (obj === '')) return true;
  const outBool = Object.keys(obj).reduce((acc, key) => {
    if (isNaN(key)) acc = false;
    return acc;
  }, true);
  return outBool;
};

export default isString;
