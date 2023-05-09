import validations, {errorObject} from "../src/helper/validations.js";
import { errorType } from "../src/helper/constants.js";
import { ObjectId } from "mongodb";

const checkId = (id, varName) => {
  id = validations.checkId(id, varName);

  if (!ObjectId.isValid(id)) throw `Error: ${varName} invalid object ID`;

  return id;
};

// Validates login request for route and data
export const validateLoginRequest = (params) => {
  let { username, password } = params;

  const errors = [];
  try {
    username = validations.checkUsername(username);
  } catch (e) {
    errors.push(e);
  }
  try {
    password = validations.checkPassword(password);
  } catch (e) {
    errors.push(e);
  }

  if (errors?.length) {
    throw [400, errors]
  };
  return { username, password };
};

const capitalizeFirst = (str) => {
  return str ? str[0].toUpperCase() + str.slice(1, str.length) : '';
};

export const validateName = (value, fieldName) => {
  // try {
  //   value = validations.checkString(value, fieldName);
  //   const nameRegex = /^[A-Za-z\s]*$/;
  //   if (!nameRegex.test(value)) {
  //     throw errorObject(errorType.BAD_INPUT, `Error: ${fieldName} can only contain letters and spaces`);
  //   };
  //   if(value.length > 50 || value.length >0){
  //     throw errorObject(errorType.BAD_INPUT, `Error: ${fieldName} can only contain 50 characters`);
  //   }
  //   return value;
  // } catch(e) {
  //   throw e?.message ? capitalizeFirst(e?.message?.replace('Error: ', '')) : '';
  // };
  return validations.validateName(value, fieldName)
};

export default { ...validations, checkId };
//export default validations
