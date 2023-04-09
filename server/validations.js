import { ObjectId } from "mongodb";

const exportedMethods = {
  checkString(strVal, varName) {
    if (!strVal) throw "All fields need to have valid values";
    if (typeof strVal !== "string") throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw `Error: ${varName} cannot be an empty string or string with just spaces`;
    if (!isNaN(strVal))
      throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
    return strVal;
  },
  checkAge(age){
    if(!age){
        throw "Error: All fields need to have valid values"
    }
    if(typeof age !== "number"){
        throw "Error: age should be number"
    }
    if(age < 13){
        throw "Error: under age"
    }
  }
};

export default exportedMethods;
