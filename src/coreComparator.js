import getObjFromFile from './fileParsing.js';

const isKeyPresent = (key, obj) => {
  // checking the presentanse of key in object by filtering
  if (Object.keys(obj).filter((value) => (value === key)).length > 0) {
    return true;
  } else { 
    return false }
}

const isNotObject = (obj) => {
  //main check: string is not a object in the task
  //empty object is not a object in the task
  for (let key in obj) {
    // in case obj is string = array of char this is empty object. In this case 
    // key is nomber. We reject this and return isNotObject = true
    if (!isNaN(key)) return true;
    // in case not empty object and not a string value it will start to execute
    return false;
  }
  // loop execution not started = this is empty object
  return true;
}

const pushDiffValueObject = (key, val1, val2, arr, tabulationDeep) => {
  arr.push([`${tabulationDeep}-`, `${key}:`, val1]);
  arr.push([`${tabulationDeep}+`, `${key}:`, val2]);
}

const makeTabulation = (tabulationDeep) => {return tabulationDeep + '  '};

// in case value of the object is null need to switch it to string 'null'
// otherwise return value as is
const isNullToString = (val) => {if (val === null) return 'null'
return val;}

const makeElementArray = (accArray, tabulationDeep, symbal, key, objVal) => {
  return accArray.push([`${tabulationDeep}${symbal}`, `${key}:`, `${isNullToString(objVal)}`]);
}

const findCommon = (obj1, obj2, inputArray, tabulationDeep) => {
  // checking the same keys in the objects
  const tab = makeTabulation(tabulationDeep);
  const ent = String.fromCharCode(10);
  return Object.keys(obj1).reduce((acc, key) => {
    if (isKeyPresent(key, obj2)) {
      // in case key common check if value is the same and push the result
      if (isNotObject(obj1[key])){
        // this is leaf
        if (obj1[key] === obj2[key]) {
          // in case key values are same
          acc.push([`${tabulationDeep} `, `${key}:`, isNullToString(obj1[key])])
        } else {
          //in case key values are different
          if (isNotObject(obj2[key])) {
            // in case obj1[key] is leaf and obj2[key] is leaf just process as replacement 
            pushDiffValueObject(`${key}`, isNullToString(obj1[key]), isNullToString(obj2[key]), acc, tabulationDeep)
          } else {
            //in case obj1[key] is leaf and obj2[key] is NOT leaf we need to
            //push old parameter value
            //and copy obj2[key] tree
            makeElementArray(acc, tabulationDeep, '-', key, obj1[key]);
            acc.push([`${tabulationDeep}+`, `${key}:`, `{${ent}${compareObjects({}, obj2[key], tab, ' ')}${ent}${tabulationDeep}}`]);
          }
        }
        // !!!! in case object inside
        } else {
          if (!isNotObject(obj2[key])) {
          acc.push([`${tabulationDeep} `, `${key}:`, `{${ent}${compareObjects(obj1[key], obj2[key], tab, '-')}${ent}${tabulationDeep}}`]);
        } else {
          // in case second object is one string
          acc.push([`${tabulationDeep}-`, `${key}:`, `{${ent}${compareObjects(obj1[key], {}, tab, ' ')}${ent}${tabulationDeep}}`]);
          makeElementArray(acc, tabulationDeep, '+', key, obj2[key]);
        }
      }
      }
    return acc;
  }, inputArray);
}

const findUniue = (obj1, obj2, inputArray, tabulationDeep, firstSym = '-') => {
  //checking the keys in obj1 that absent in obj2
  // encrease the level of tabulation:
  const tab = makeTabulation(tabulationDeep);
  const ent = String.fromCharCode(10);
  return Object.keys(obj1).reduce((acc, key) => {
  // check if key present in both
    if (!isKeyPresent(key, obj2)){
      // in case obj1 has unique key
      if (isNotObject(obj1[key])){
      // this is leaf
      acc.push([`${tabulationDeep}${firstSym}`, `${key}:`, isNullToString(obj1[key])]);
      // !!!! in case object inside
      } else {
        acc.push([`${tabulationDeep}${firstSym}`, `${key}:`, `{${ent}${compareObjects(obj1[key], {}, tab, ' ')}${ent}${tabulationDeep}}`]);
      }
    }
    return acc;
  }, inputArray)
}

const generateRezultArray = (obj1, obj2, tabulationDeep, firstSym) => {
  return findCommon(obj1, obj2, findUniue(obj1, obj2, findUniue(obj2, obj1, [], tabulationDeep, '+'), tabulationDeep, firstSym), tabulationDeep);
}

const compareFiles = (rawData) => {
  // check if all data presented
if (rawData.args[0] === undefined) return '';
//make objects
const obj1 = getObjFromFile(rawData.args[0]);
const obj2 = getObjFromFile(rawData.args[1]);

console.log('obj1 = ', obj1);
console.log('obj2 = ', obj2);
return compareObjects(obj1, obj2, '', '-');
}

const compareObjects = (obj1, obj2, tabulationDeep = '', firstSym = '-') => {
// make out array
const outArr = generateRezultArray(obj1, obj2, tabulationDeep, firstSym)
// sort array by names
.sort((a, b) => {return (a[1] < b[1] ? -1 : (a[1] > b[1] ? 1 : 0))})
//make string from array element, that splited to 3 strings
.map((cell) => {
  return cell.join(' ');
});
// make string from array by join via 'enter' symbal
return outArr.join(String.fromCharCode(10));
}

export default compareFiles;