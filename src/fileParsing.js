import { readFileSync } from 'fs';
import { load } from 'js-yaml';

const getObjFromFile = (file) => {
    // return object from file
    //get extention of file via splitting to two parts by '.' symbal and return second
    // value of array
    const fileExt = file.split('.', 2)[1];
    // in case yml file on input return parse yml type file
    if ((fileExt === 'yml') || (fileExt === 'yaml')) return load(readFileSync(file));
    // in case it wasnt yml file return parsing of json file
    return JSON.parse(readFileSync(file))}

export default getObjFromFile;