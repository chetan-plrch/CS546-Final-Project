import validations, {errorObject} from "../src/helper/validations.js";
import { errorType } from "../src/helper/constants.js";
import { ObjectId } from "mongodb";

const checkId = (id, varName) => {
  id = validations.checkId(id, varName);

  if (!ObjectId.isValid(id)) throw errorObject(errorType.BAD_INPUT, `Error: ${varName} must be a valid ObjectId`);

  return id;
};

// Validates login request for route and data
export const validateLoginRequest = (params) => {
  let { username, password } = params;

  const errors = [];
  try {
    username = validations.checkUsername(username);
  } catch (e) {
    errors.push(e?.message);
  }
  try {
    password = validations.checkPassword(password);
  } catch (e) {
    errors.push(e?.message);
  }

  if (errors?.length) {
    throw [400, errors]
  };
  return { username, password };
};

export default { ...validations, checkId };
//export default validations
