import { ObjectId } from "mongodb";
import { Router } from "express";
import { userData } from "../data/index.js";

import { errorType, roleType } from "../util.js";
import { authenticate, authorize } from "../middleware/index.js";
import * as  validation from "../validations.js";

const router = Router()

router.route('/').get(async (req, res) => {
  try {
    const users = await userData.getAll();

    const result = users.map((user) => ({
      _id: user._id.toString(),
      username: user.username,
    }));

    if (!result) {
      return res.status(404).json({ error: 'Users not found' });
    }

    return res.status(200).json(result);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Internal server error' });
  }
})


.post(async (req, res) =>{
  try {
    const { username, firstName, lastName, email, password, gender, city, state, age, isAnonymous, role, profileUrl, connections, isActive } = req.body;

    validation.validate(username, firstName, lastName, email, password, gender, city, state, age, isAnonymous, role, profileUrl, connections, isActive);

    const newUser = await userData.create(username, firstName, lastName, email, password, gender, city, state, age, isAnonymous, role, profileUrl, connections, isActive);

    res.status(200).json(newUser);
  } catch(error) {
    res.status(400).json({ error: error.message });
  }
});


router.route('/:id').get(async (req,res) =>{
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid id');
    }
    const user = await userData.get(id);
    if(!user){
      throw new Error('No user with that id');
    }
    res.status(200).json({
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
    });
  } catch (error) {
    if (error.message === 'Invalid id') {
      res.status(400).json({ error: 'Invalid id' });
    } else if (error.message === 'No user with that id') {
      res.status(404).json({ error: 'No user with that id' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } 
})

.delete(async (req,res) =>{
  const id = req.params.id;
  
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const message = await userData.remove(id);
    if(!message){
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json({ userId: id, deleted: true });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
})

.put(async (req,res) =>{
  try{
    const id = req.params.id;
    const {username, firstName, lastName, email, password, gender, city, state, age, isAnonymous, role, profileUrl, connections, isActive} = req.body;
    
    validation.validate(username, firstName, lastName, email, password, gender, city, state, age, isAnonymous, role, profileUrl, connections, isActive); // validate request body
    
    const updateUser = await userData.update(id, username, firstName, lastName, email, password, gender, city, state, age, isAnonymous, role, profileUrl, connections, isActive);
    
    res.status(200).json(updateUser);
  } catch (error){
    res.status(400).json({ error: error.message });
  }
})


router.get("/user", authenticate, async (req, res) => {
  return res.send(req.user);
});


router.post("/signup", async (req, res) => {
  let userInfo = req.body;
  if (!userInfo || Object.keys(userInfo).length === 0) {
    return res
      .status(400)
      .json({ error: "There are no fields in the request body" });
  }
  //validating the request body
  let Allerrors = []
  try{
  userInfo.firstName = validation.checkString(userInfo.firstName,"First name");
  }catch(e){
    Allerrors.push(e)
  }

  try {
    userInfo.lastName = validation.checkString(userInfo.lastName,"Last Name");
  } catch (e) {
    Allerrors.push(e)
  }

  try {
    userInfo.userName = validation.checkString(userInfo.userName,"User name");
  } catch (e) {
    Allerrors.push(e)
  }
  try {
    userInfo.userName = validation.checkUsername(userInfo.userName);
  } catch (e) {
    Allerrors.push(e)
  }

  try {
    userInfo.email = validation.checkMailID(userInfo.email);
  } catch (e) {
    Allerrors.push(e)
  }

  try {
    userInfo.password = validation.checkPassword(userInfo.password);
  } catch (e) {
    Allerrors.push(e)
  }

  try {
    userInfo.age = validation.checkAge(userInfo.age);
  } catch (e) {
    Allerrors.push(e)
  }

  try {
    userInfo.city = validation.checkString(userInfo.city,"city");
  } catch (e) {
    Allerrors.push(e)
  }

  try {
    userInfo.state = validation.checkString(userInfo.state,"state");
  } catch (e) {
    Allerrors.push(e)
  }

  if(Allerrors.length > 0){
    return res.send({Allerrors})
  }

  try {
    const newUser = await userData.create(
      userInfo.firstName,
      userInfo.lastName,
      userInfo.userName,
      userInfo.email,
      userInfo.password,
      userInfo.gender,
      userInfo.age,
      userInfo.city,
      userInfo.state,
      userInfo.isAnonymous,
      userInfo.role,
      userInfo.profilePic
    );
    //res.json(newUser)
    res.status(200).send({message: 'Successfully created user' })
  } catch (e) {
    let status = e[0] ? e[0] : 500;
    let message = e[1] ? e[1] : "Internal Server Error";
    //console.log(message);
    res.status(status).json({ error: message });
    //console.log(e);
  }
});

router.post("/login", async (req, res) => {
  const userObj = req.body;

  if (!userObj || Object.keys(userObj).length === 0) {
    return res
      .status(400)
      .json({ error: "There are no fields in the request body" });
  }
  //validation for the req body
  let Allerrors = []
  
  if(userObj.userName.trim() === "" || !userObj.userName){
    Allerrors.push("enter username")
  }
  if(userObj.password.trim() === "" || !userObj.password){
    Allerrors.push("enter password")
  }

  if(Allerrors.length > 0){
    return res.send({Allerrors})
  }

  try{
  const token = await userData.checkLogged(userObj.userName.trim(), userObj.password.trim())

  res.cookie("token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
  return res.status(200).send({ message: "User successfully loggedin" });
  }catch(e){
    let status = e[0] ? e[0] : 500;
    let message = e[1] ? e[1] : "Internal Server Error";
    //console.log(message);
    res.status(status).json({ error: message });
    //console.log(e);
  }
},authenticate);

router.get("/check", authenticate, authorize(roleType.ADMIN), (req, res) => {
  return res.status(200).send({ message: "This is authorized" });
});

export default router;