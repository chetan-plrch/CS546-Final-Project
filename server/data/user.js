import { users } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import validation from "../validations.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const create = async (
  firstName,
  lastName,
  userName,
  email,
  password,
  gender,
  age,
  city,
  state,
  isAnonymous,
  role
) => {
  const userCollection = await users();
  const userNameExits = await userCollection.findOne({userName: userName})
  if(!userNameExits){
    throw "Error: username already used"
  }
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user object with the hashed password
  const newUser = {
    firstName,
    lastName,
    userName,
    email,
    password: hashedPassword,
    gender,
    age,
    city,
    state,
    isAnonymous,
    role,
  };
  
  const insertInfo = await userCollection.insertOne(newUser);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw [404, "Could not create new band"];

  let userId = insertInfo.insertedId;
  let res = {};
  res = await userCollection.findOne({ _id: userId });
  res._id = res._id.toString();
  return res;
};

const checkLogged = async(
  userName,
  password
)=>{
  const userCollection = await users();
  const user = await userCollection.findOne({userName: userName})
  if(!user){
    throw "Error: username not found"
  }

  const isPasswordMatch = await bcrypt.compare(password,user.password);
  if(!isPasswordMatch){
    throw "Error: Invalid Password"
  }

  const token = jwt.sign(
    { _id: user._id, username: user.username },
    "private-key"
  );
  
  return token
}

export default { create,checkLogged };
