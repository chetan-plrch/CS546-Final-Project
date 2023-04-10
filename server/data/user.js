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
  role,
  profilePic = null
) => {
  //validating the request body
  let Allerrors = [];
  try {
    firstName = validation.checkString(firstName, "First name");
  } catch (e) {
    Allerrors.push(e);
  }

  try {
    lastName = validation.checkString(lastName, "Last Name");
  } catch (e) {
    Allerrors.push(e);
  }

  try {
    userName = validation.checkString(userName, "User name");
  } catch (e) {
    Allerrors.push(e);
  }
  try {
    userName = validation.checkUsername(userName);
  } catch (e) {
    Allerrors.push(e);
  }

  try {
    email = validation.checkMailID(email);
  } catch (e) {
    Allerrors.push(e);
  }

  try {
    password = validation.checkPassword(password);
  } catch (e) {
    Allerrors.push(e);
  }

  try {
    age = validation.checkAge(age);
  } catch (e) {
    Allerrors.push(e);
  }

  try {
    city = validation.checkString(city, "city");
  } catch (e) {
    Allerrors.push(e);
  }

  try {
    state = validation.checkString(state, "state");
  } catch (e) {
    Allerrors.push(e);
  }

  if (Allerrors.length > 0) {
    throw [400, Allerrors];
  }

  const userCollection = await users();
  const userNameExits = await userCollection.findOne({ userName: userName });
  if (userNameExits) {
    throw [404, "Error: username already used"];
  }
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Convert the image to binary data
  let profilePicData = null;
  if (profilePic) {
    const fileContent = fs.readFileSync(profilepic.path);
    profilePicData = new Binary(fileContent);
  }

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
    profilePic : profilePicData,
    connections : {blocked : [],active:[]},
    isActive : true
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

const checkLogged = async (userName, password) => {
  let Allerrors = []

  if(userName.trim() === "" || !userName){
    Allerrors.push("enter username")
  }
  if(password.trim() === "" || !password){
    Allerrors.push("enter password")
  }

  if(Allerrors.length > 0){
    throw [400,Allerrors]
  }
  const userCollection = await users();

  const user = await userCollection.findOne({ userName: userName });
  if (!user) {
    throw [400, "username/password one them is incorrect"];
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw [400, "username/password one them is incorrect"];
  }

  const token = jwt.sign(
    { _id: user._id, username: user.username },
    "private-key"
  );

  return token;
};

export default { create, checkLogged };
