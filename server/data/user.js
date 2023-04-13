import { ObjectId } from "mongodb";
import { users } from "../config/mongoCollections.js";
import {compareAndUpdate} from "../validations.js";
import {validate} from "../validations.js";
import {exportedMethods} from "../validations.js"

export const create = async (username, firstName, lastName, email, password, gender, city, state, age, isAnonymous, role, profileUrl, connections, isActive) => {
  validate(username, firstName, lastName, email, password, gender, city, state, age, isAnonymous, role, profileUrl, connections, isActive);

  const Createuser = {
    username: username.trim(),
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.trim(),
    password: password.trim(),
    gender: gender.trim(),
    city: city.trim(),
    state: state.trim(),
    age: age,
    isAnonymous: isAnonymous,
    role: role.trim(),
    profileUrl: profileUrl.trim(),
    connections: connections,
    isActive: isActive,
  };

  const UserCollection = await users();
  const insert = await UserCollection.insertOne(Createuser);

  const insertedUser = { _id: insert.insertedId, ...Createuser };
  return insertedUser;
};
  
  export const getAll = async() => {
    const allUsers = await users();

    const findall = await allUsers.find({}).toArray();

    return findall.map((user) => ({
        _id:user._id.toString(),
        username:user.username,
      firstName:user.firstName,
      lastName: user.lastName,
      email:user.email,
      password:user.password,
      gender:user.gender,
      city:user.city,
      state:user.state,
      age:user.age,
      isAnonymous:user.isAnonymous,
      role:user.role,
      profileUrl:user.profileUrl,
      connections:user.connections,
      isActive:user.isActive,
    }));
  };

  // export const create = async (
  //   firstName,
  //   lastName,
  //   userName,
  //   email,
  //   password,
  //   gender,
  //   age,
  //   city,
  //   state,
  //   isAnonymous,
  //   role,
  //   profilePic //convert the image into base 64 form
  // ) => {
  //   //validating the request body
  //   let Allerrors = [];
  //   try {
  //     firstName = exportedMethods.checkString(firstName, "First name");
  //   } catch (e) {
  //     Allerrors.push(e);
  //   }
  
  //   try {
  //     lastName = exportedMethods.checkString(lastName, "Last Name");
  //   } catch (e) {
  //     Allerrors.push(e);
  //   }
  
  //   try {
  //     userName = exportedMethods.checkString(userName, "User name");
  //   } catch (e) {
  //     Allerrors.push(e);
  //   }
  //   try {
  //     userName = exportedMethods.checkUsername(userName);
  //   } catch (e) {
  //     Allerrors.push(e);
  //   }
  
  //   try {
  //     email = exportedMethods.checkMailID(email);
  //   } catch (e) {
  //     Allerrors.push(e);
  //   }
  
  //   try {
  //     password = exportedMethods.checkPassword(password);
  //   } catch (e) {
  //     Allerrors.push(e);
  //   }
  
  //   try {
  //     age = exportedMethods.checkAge(age);
  //   } catch (e) {
  //     Allerrors.push(e);
  //   }
  
  //   try {
  //     city = exportedMethods.checkString(city, "city");
  //   } catch (e) {
  //     Allerrors.push(e);
  //   }
  
  //   try {
  //     state = exportedMethods.checkString(state, "state");
  //   } catch (e) {
  //     Allerrors.push(e);
  //   }
  
  //   if (Allerrors.length > 0) {
  //     throw [400, Allerrors];
  //   }
  
  //   const userCollection = await users();
  //   const userNameExits = await userCollection.findOne({ userName: userName });
  //   if (userNameExits) {
  //     throw [404, "Error: username already used"];
  //   }
  //   // Hash the password
  //   const hashedPassword = await bcrypt.hash(password, 10);
  
  //   if(!profilePic){
  //     profilePic = null
  //   }
  
    
  //   // Create a new user object with the hashed password
  //   const newUser = {
  //     firstName,
  //     lastName,
  //     userName,
  //     email,
  //     password: hashedPassword,
  //     gender,
  //     age,
  //     city,
  //     state,
  //     isAnonymous,
  //     role,
  //     profilePic,
  //     connections : {blocked : [],active:[]},
  //     isActive : true
  //   };
  
  //   const insertInfo = await userCollection.insertOne(newUser);
  //   if (!insertInfo.acknowledged || !insertInfo.insertedId)
  //     throw [404, "Could not create new band"];
  
  //   let userId = insertInfo.insertedId;
  //   let res = {};
  //   res = await userCollection.findOne({ _id: userId });
  //   res._id = res._id.toString();
  //   return res;
  // };

  export const get = async (id) => {

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

  export const remove = async (id) => {
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

  export const update = async(id, username, firstName, lastName, email, password, gender, city, state, age, isAnonymous, role, profileUrl, connections, isActive) => {

    if (!id || typeof id !== "string" || id.trim().length === 0) {
      throw new Error("Invalid id");
    }
    id = id.trim();

 validate(username, firstName, lastName, email, password, gender, city, state, age, isAnonymous, role, profileUrl, connections, isActive);

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
        role, 
        profileUrl,
        connections,
         isActive,
      },
    };
    const options = { returnOriginal: false };
    const result = await db.findOneAndUpdate(filter, update, options);

    const updatedDoc = await db.findOne({ _id: new ObjectId(id) });

    if (compareAndUpdate(updatedDoc, result.value)) {
      throw new Error('No changes made to the document');
    }

    return {
      ...updatedDoc,
      _id: updatedDoc._id.toString(),
    };
  };

  export const checkLogged = async (userName, password) => {
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
  