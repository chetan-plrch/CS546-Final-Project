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

export const validateNameValue = (value, fieldName) => {
  value = validations.checkString(value, fieldName);
  const nameRegex = /^[A-Za-z\s]*$/;
  if (!nameRegex.test(value)) {
    throw errorObject(errorType.BAD_INPUT, `Error: ${fieldName} can only contain letters and spaces`);
  };
  return value;
};

export const validateName = (value, fieldName) => {
  try {
    return validateNameValue(value, fieldName)
  } catch(e) {
    throw e?.message ? capitalizeFirst(e?.message?.replace('Error: ', '')) : '';
  };
};

export default { ...validations, checkId };
//export default validations
