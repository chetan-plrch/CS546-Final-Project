import { ObjectId } from "mongodb";
import { users } from "../config/mongoCollections.js";
import validation from "../validations.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import jwtConfig from "../config/jwtConfig.js";
import crypto from 'crypto'
import { formatUser, errorObject, errorType } from "../util.js";

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

  if(city){
  try {
    city = validation.checkString(city, "city");
  } catch (e) {
    errors.push(e);
  }
}

  if(state){
  try {
    state = validation.checkString(state, "state");
  } catch (e) {
    errors.push(e);
  }
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

  if(role === "listener"){
    isAnonymous = false;
  }

  if (errors.length > 0) {
    throw [400, errors];
  }

  const userCollection = await users();
  const userNameExits = await userCollection.findOne({ username }, { password: 0 });
  const emailExits = await userCollection.findOne({email}, { password: 0 });
  if (userNameExits) {
    throw [404, "Error: username already used"];
  }

  if (emailExits) {
        throw [404, "Error: email already used"];
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
    password = validation.checkPassword(password);
  } catch (e) {
    errors.push(e);
  }

  if(errors.length > 0){
    throw [400,errors]
  }
  const userCollection = await users();

  const user = await userCollection.findOne({ username }, { password: 0 });
  if (!user) {
    throw [400, "username/password one of them is incorrect"];
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw [400, "username/password one of them is incorrect"];
  }

  const token = jwt.sign(
    { _id: user._id, username: user.username,firstName: user.firstName },
    jwtConfig.secret
  );

  return {user,token};
};

const getAllUsers = async (queryParams) => {
  // TODO - 1. Send all if not role provided 2. Check if active 3. Send only relevant fields
  const userCollection = await users();
  queryParams.isActive = queryParams.isActive === 'true';
  const usersResponse = await userCollection.find(queryParams).toArray();
  if (!usersResponse?.length) {
    throw [404, "Users not found"];
  };
  usersResponse?.forEach((item) => {
    item._id = item._id.toString();
  });
  return usersResponse;
};

const get = async (id) => {

  if (!id || typeof id !== "string" || id.trim().length === 0) {
    throw new Error("Invalid id");
  }
   id = id.trim();

   if (!ObjectId.isValid(id)){
    throw new Error ('invalid object ID');
   } 

   const getID = await collection.findOne({_id: new ObjectId(id)});
  
   
   if(getID === null){
    throw new Error("No user with that id");
   }

   getID._id = getID._id.toString();
}

const allUsers = async()=>{
  const collection = await users();
   const getID = await collection.find({}, { projection: { _id: 1, role: 1 } }).toArray();
   const result = getID.map(obj => {
    obj._id = obj._id.toString();
    return obj;
  });
  return result;
}

 const remove = async (id) => {
  if (!id || typeof id !== "string" || id.trim().length === 0) {
    throw new Error("Invalid ID provided");
  }
  id = id.trim();

  if (!ObjectId.isValid(id)){
    throw new Error ('invalid object ID');
   } 

  const db = await users();

  const user = await db.findOne({ _id: new ObjectId(id) }, { password: 0 });
  if (!user) {
    throw new Error("user not found");
  }

  await db.deleteOne({ _id: new ObjectId(id) });

  const message = user.name + " has been successfully deleted!";
  return message;
};


const updateUserRandom = async (id, { permanent, isActive }) => {
  const db = await users();

  const user = await db.findOne({ _id: new ObjectId(id) }, { password: 0 });
  if (!user) {
    throw errorObject(errorType.NOT_FOUND, 'User not found in the system')
  }

  let updatedUser = {};
  if (permanent) {
    const newUsername = crypto.randomBytes(8).toString('hex');
    const newPassword = crypto.randomBytes(12).toString('hex');

    updatedUser = {
      username: newUsername,
      password: newPassword,
      email: null,
      profilePic: null,
      firstName: 'Deleted',
      lastName: 'User',
      city: null,
      state: null,
      age: null,
      gender: null,
      isActive: false
    };
  } else {
    updatedUser = { isActive }
  }

  await db.updateOne({ _id: new ObjectId(id) }, { $set: updatedUser });

  const message = "Successfully processed the request";
  return message;
};


const update = async({
  id, username, firstName, lastName, email, password, city, state, age, isAnonymous, profilePic 
}) => {
  let updateObj = { username, firstName, lastName, email, city, state, age, isAnonymous, profilePic }
  const userId = validation.checkId(id)

  const usersCol = await users();
  if (password) {
    const newPassword = await bcrypt.hash(password, 10);
    updateObj = { ...updateObj, password: newPassword }
  }
  
  const result = await usersCol.findOneAndUpdate({ _id: new ObjectId(userId) }, {
    $set: updateObj
  }, { returnOriginal: false });

  const updatedDoc = await usersCol.findOne({ _id: new ObjectId(id) }, { password: 0 });

  return {
    ...updatedDoc,
    _id: updatedDoc._id.toString(),
  };
};

const getAllBlockedUsers = async (id) => {
  const userId = validation.checkId(id)

  const db = await users();
  const user = await db.findOne({ _id: new ObjectId(userId) }, { password: 0 });
  if (!user) {
    throw errorObject(errorType.BAD_INPUT, 'Error: User is not loggedin')
  }

  const blockedUserIds = user.connections?.blocked;

  const blockedUser = await Promise.all(blockedUserIds.map((blockedUserId) => {
    return db.findOne({ _id: new ObjectId(blockedUserId) }, { password: 0 });
  }))
  
  const userDetails = blockedUser.map((user) => {
    return formatUser(user)
  });

  return userDetails;
};

export default { create, checkLogged, get, remove, update,getAllUsers, updateUserRandom,getAllBlockedUsers,allUsers };
