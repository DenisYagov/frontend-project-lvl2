import makeStilishString from './stylish.js'

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
            return 'not yet ready'
            }
        default:
            {
            return null;    
            }
    }
}

export default makeStringFromArray