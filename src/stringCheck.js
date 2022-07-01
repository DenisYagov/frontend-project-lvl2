const isString = (obj) => {
    //return true if object is string
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

  export default isString