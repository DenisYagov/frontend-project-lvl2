import makeStilishString from './stylish.js'

const makeStringFromArray = (type, inputArray) => {
    console.log('we aere here, type = ', type)
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
            console.log('output format is stylish');
            return makeStilishString(inputArray) 
            }
    }
}

export default makeStringFromArray