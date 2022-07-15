import makeStilishString from './stylish.js';
import makePlainString from './plain.js';
import makeJsonString from './json.js';

const defFormat = 'stylish';

const makeStringFromArray = (type, inputArray) => {
  switch (type) {
    case 'json':
    {
      return makeJsonString(inputArray);
    }
    case 'plain':
    {
      return makePlainString(inputArray);
    }
    default:
    {
      return makeStilishString(inputArray);
    }
  }
};

export default makeStringFromArray;
export { defFormat };
