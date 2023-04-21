import { users } from "../config/mongoCollections.js";
import validation from "../validations.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const create = async (
  firstName,
  lastName,
  username,
  email,
  password,
  gender,
  age,
  city,
  state,
  isAnonymous,
  role,
  profilePic //convert the image into base 64 form
) => {
  //validating the request body
  let errors = [];
  try {
    firstName = validation.checkString(firstName, "Firstname");
  } catch (e) {
    errors.push(e);
  }

  try {
    lastName = validation.checkString(lastName, "Lastname");
  } catch (e) {
    errors.push(e);
  }

  try {
    username = validation.checkString(username, "Username");
  } catch (e) {
    errors.push(e);
  }
  try {
    username = validation.checkUsername(username);
  } catch (e) {
    errors.push(e);
  }

  try {
    email = validation.checkMailID(email);
  } catch (e) {
    errors.push(e);
  }

  try {
    password = validation.checkPassword(password);
  } catch (e) {
    errors.push(e);
  }

  try {
    age = validation.checkAge(age);
  } catch (e) {
    errors.push(e);
  }

  try {
    city = validation.checkString(city, "city");
  } catch (e) {
    errors.push(e);
  }

  try {
    state = validation.checkString(state, "state");
  } catch (e) {
    errors.push(e);
  }

  try {
    gender = validation.checkGender(gender)
  } catch (e) {
    errors.push(e)
  }

  try {
    role = validation.checkRole(role)
  } catch (e) {
    errors.push(e)
  }

  if (errors.length > 0) {
    throw [400, errors];
  }

  const userCollection = await users();
  const userNameExits = await userCollection.findOne({ username });
  if (userNameExits) {
    throw [404, "Error: username already used"];
  }
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  if(!profilePic){
    profilePic = null
  }
  
  // Create a new user object with the hashed password
  const newUser = {
    firstName,
    lastName,
    username,
    email,
    password: hashedPassword,
    gender,
    age,
    city,
    state,
    isAnonymous,
    role,
    profilePic,
    connections : {blocked : [],active:[]},
    isActive : true
  };

  const insertInfo = await userCollection.insertOne(newUser);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw [404, "Could not create new user"];

  let userId = insertInfo.insertedId;
  let res = {};
  res = await userCollection.findOne({ _id: userId });
  res._id = res._id.toString();
  return res;
};

const checkLogged = async (username, password) => {
  let errors = []

  if(username.trim() === "" || !username){
    errors.push("Error: Enter username")
  }
  if(password.trim() === "" || !password){
    errors.push("Error: Enter password")
  }

  try {
    username = validation.checkString(username, "username");
  } catch (e) {
    errors.push(e);
  }
  try {
    username = validation.checkUsername(username);
  } catch (e) {
    errors.push(e);
  }

  try {
    password = validation.checkPassword(password);
  } catch (e) {
    errors.push(e);
  }

  if(errors.length > 0){
    throw [400,errors]
  }
  const userCollection = await users();

  const user = await userCollection.findOne({ username });
  if (!user) {
    throw [400, "username/password one of them is incorrect"];
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw [400, "username/password one of them is incorrect"];
  }

  const token = jwt.sign(
    { _id: user._id, username: user.username,firstName: user.firstName },
    "private-key"
  );
  //console.log(token);

  return token;
};

export default { create, checkLogged };
