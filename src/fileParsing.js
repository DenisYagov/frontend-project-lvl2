import { load } from 'js-yaml';

const getObjFromString = (dataStr, type) => {
  // return object from string dataStr
  // in case yml string format on input return parse yml type
  if (type === 'yml') return load(dataStr);
  // in case it wasnt yml file return parsing of json
  return JSON.parse(dataStr);
};

export default getObjFromString;
