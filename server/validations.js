import validations from "../src/validation.js"
import { ObjectId } from "mongodb";

const checkId = async(id, varName) =>{
    id = validations.checkId(id,varName)
    if (!ObjectId.isValid(id)) throw `Error: ${varName} invalid object ID`;
    return id.trim();
}

export default {...validations, checkId}

