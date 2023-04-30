import { ObjectId } from 'mongodb'
import { errorObject, errorType } from './util.js';

const exportedMethods = {
  checkString(strVal, varName) {
    if (!strVal) throw `Error: ${varName} field needs to have valid values`;
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
        throw `Error: age fields need to have valid values`;
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
    return email.trim().toLowerCase()
  },
  checkUsername(username){
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/; // Regex to validate username
    if(!usernameRegex.test(username)){
      throw "Error: username can only contain alphanumeric characters and underscores and a length between 3 and 20 characters "
    }
    return username.trim().toLowerCase()
  },
  checkGender(gender){
    const allowedGenders = ["M", "F", "male", "female","m","f","other"];
    if(!allowedGenders.includes(gender.toLowerCase())){
      throw "Error: Enter valid gender"
    }
    return gender.toLowerCase()
  },
  checkRole(role){
    const allowedRole = ["listener","seeker"];
    if(!allowedRole.includes(role.toLowerCase())){
      throw "Error: Enter valid role"
    }
    return role.toLowerCase()
  },
  checkId(id, varName) {
    if (!id) throw `Error : ${varName} need to have valid values`;
    if (typeof id !== "string") throw `Error:${varName} must be a string`;
    id = id.trim();
    if (id.length === 0)
      throw `Error: ${varName} cannot be an empty string or just spaces`;
    if (!ObjectId.isValid(id)) throw `Error: ${varName} invalid object ID`;
    return id.trim();
  },
  checkRating(rate, varName){
    if(!rate){ 
      throw `${varName} needs to have a value`
    }
    if(isNaN(parseInt(rate))){
      throw `${varName} must be a number`
    } 
    rate = parseInt(rate);
    if(rate > 5){
      throw `${varName} must be between 1 and 5`
    }
    return rate
  },
  checkPublic(val){
    const allowedVal = [true,false]
    if(!allowedVal.includes(val)){
      throw "Error: Enter valid value for isPublic"
    }
    return val
  }
};

export default exportedMethods;
