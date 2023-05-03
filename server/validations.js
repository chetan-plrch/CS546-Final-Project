import validations from "../src/validation.js";
import { ObjectId } from "mongodb";

const checkId = (id, varName) => {
  id = validations.checkId(id, varName);
  console.log(typeof id);

  if (!ObjectId.isValid(id)) throw `Error: ${varName} invalid object ID`;

  return id;
};

export default { ...validations, checkId };
//export default validations
