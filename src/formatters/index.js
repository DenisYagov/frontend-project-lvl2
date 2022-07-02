import makeStilishString from './stylish.js'
import makePlainString from './plain.js'

const makeStringFromArray = (type, inputArray) => {
    switch(type)
    {
        case 'stylish':
            {
            console.log('output format is stylish');
            return makeStilishString(inputArray)
            }
        case 'plain':
            {
            console.log('output format is plain');
            return makePlainString(inputArray)
            }
        default:
            {
            console.log('output format is stylish as default');
            return makeStilishString(inputArray);
            }
    }
}

export default makeStringFromArray