import makeStilishString from './stylish.js';
import makePlainString from './plain.js';
import makeJsonString from './json.js';

const makeStringFromArray = (type, inputArray) => {
  switch (type) {
    case 'json':
    {
      console.log('output format is json');
      return makeJsonString(inputArray);
    }
    case 'plain':
    {
      console.log('outp ut format is plain');
      return makePlainString(inputArray);
    }
    default:
    {
      console.log('output format is stylish as default');
      return makeStilishString(inputArray);
    }
  }
};

export default makeStringFromArray;
