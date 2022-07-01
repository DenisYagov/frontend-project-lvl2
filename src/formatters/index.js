import makeStilishString from './stylish.js'

const makeStringFromArray = (type, inputArray) => {
    switch(type)
    {
        case 'stylish':
            {
            return makeStilishString(inputArray)
            }
        case 'plain':
            {
            return makeStilishString(inputArray)
            }
        default:
            {
            return null;    
            }
    }
}

export default makeStringFromArray