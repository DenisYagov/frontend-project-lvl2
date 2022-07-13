import { load } from 'js-yaml';

const getObjFromString = (dataStr, type) => {
  // return object from string dataStr
  // in case yml string format on input return parse yml type
  switch (type) {
    case '.yml': return load(dataStr);
    case '.yaml': return load(dataStr);
    case '.json': return JSON.parse(dataStr);
    default: throw new Error('Unknown file extention!');
  }
};

export default getObjFromString;
