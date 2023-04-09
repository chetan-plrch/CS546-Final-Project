import { ObjectId } from "mongodb";

const exportedMethods = {
  checkString(strVal, varName) {
    if (!strVal) throw "Error: All fields need to have valid values";
    if (typeof strVal !== "string") throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw `Error: ${varName} cannot be an empty string or string with just spaces`;
    if (!isNaN(strVal))
      throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
    return strVal.trim();
  },
  checkAge(age){
    if(!age){
        throw "All fields need to have valid values";
    }
    if(typeof parseInt(age) !== "number"){
        throw "Error: age should be number";
    }
    if(age < 13){
        throw "Error: under age";
    }
    return age
  },
  checkPassword(password){
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if(!passwordRegex.test(password)){
      throw "Error: password must contain at least one digit, one lowercase letter, one uppercase letter and minimum length of 8 characters";
    }
    return password.trim()
  },
  checkMailID(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex to validate email address
    if(!emailRegex.test(email)){
      throw "Error: Enter valid email ID";
    }
    return email.trim()
  },
  checkUsername(username){
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/; // Regex to validate username
    if(!usernameRegex.test(username)){
      throw "Error: username can only contain alphanumeric characters and underscores and a length between 3 and 20 characters "
    }
    return username.trim()
  }
  
};

export default exportedMethods;
