import { ObjectId } from "mongodb";
import { users } from "../config/mongoCollections.js";
import validation from "../validations.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import jwtConfig from "../config/jwtConfig.js";
import crypto from 'crypto'


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
  const userNameExits = await userCollection.findOne({ username });
  const emailExits = await userCollection.findOne({email});
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
    jwtConfig.secret
  );
  //console.log(token);

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

   const collection = await users();
   const getID = await collection.findOne({_id: new ObjectId(id)});
   if(getID === null){
    throw new Error("No user with that id");
   }

   getID._id = getID._id.toString();
   return getID;

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

  const user = await db.findOne({ _id: new ObjectId(id) });
  if (!user) {
    throw new Error("user not found");
  }

  await db.deleteOne({ _id: new ObjectId(id) });

  const message = user.name + " has been successfully deleted!";
  return message;
};


const updateUserRandom = async (id) => {
  if (!id || typeof id !== "string" || id.trim().length === 0) {
    throw new Error("Invalid ID provided");
  }
  id = id.trim();

  if (!ObjectId.isValid(id)) {
    throw new Error("Invalid object ID");
  }

  const db = await users();

  const user = await db.findOne({ _id: new ObjectId(id) });
  if (!user) {
    throw new Error("User not found");
  }

  const newUsername = crypto.randomBytes(8).toString('hex');
  const newPassword = crypto.randomBytes(12).toString('hex');

  const updatedUser = {
    username: newUsername,
    password: newPassword,
    profilePic: null,
    firstName: deleted,
    lastName: user,
  };

  await db.updateOne({ _id: new ObjectId(id) }, { $set: updatedUser });

  const message = "User " + id + " has been updated with new username " + newUsername + " and password " + newPassword;
  return message;
};


const update = async(id, username, firstName, lastName, email, password, gender, city, state, age, isAnonymous, profilePic, isActive, connections) => {
  console.log(connections);
  if (!id || typeof id !== "string" || id.trim().length === 0) {
    throw new Error("Invalid id");
  }
  id = id.trim();

// validation.validate(username, firstName, lastName, email, password, gender, city, state, age, isAnonymous, profilePic, connections, isActive);

  const db = await users();
  const filter = { _id: new ObjectId(id) };

  const update = {
    $set: {
      username, 
      firstName, 
      lastName, 
      email, 
      password, 
      gender, 
      city, 
      state,
      age,
      isAnonymous, 
      profilePic,
      isActive,
      connections,
    
    },
  };
  const options = { returnOriginal: false };
  const result = await db.findOneAndUpdate(filter, update, options);

  const updatedDoc = await db.findOne({ _id: new ObjectId(id) });

  // if (validation.compareAndUpdate(updatedDoc, result.value)) {
  //   throw new Error('No changes made to the document');
  // }

  return {
    ...updatedDoc,
    _id: updatedDoc._id.toString(),
  };
};

const getAllBlockedUsers = async (Id) => {
  if (!Id || typeof Id !== "string" || Id.trim().length === 0) {
    throw new Error("Invalid user ID provided");
  }

  const db = await users();
  const user = await db.findOne({ _id: new ObjectId(Id) });
  if (!user) {
    throw new Error("User not found");
  }

  const blockedUserIds = user.connections.blocked;
  const blockedUsers = [];

  for (const blockedUserId of blockedUserIds) {
    const blockedUser = await db.findOne({ _id: new ObjectId(blockedUserId) });
    if (blockedUser) {
      blockedUsers.push(blockedUser.username);
    }
  }

  return blockedUsers;
};

export default { create, checkLogged, get, remove, update,getAllUsers, updateUserRandom,getAllBlockedUsers };
