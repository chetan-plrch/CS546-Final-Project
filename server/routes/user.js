import { Router } from "express";
import jwt from "jsonwebtoken";
import { users } from "../config/mongoCollections.js";
import { errorType, roleType } from "../util.js";
import { authenticate, authorize } from "../middleware/index.js";
import { userData } from "../data/index.js";

const router = Router();

router.get("/user", authenticate, async (req, res) => {
  return res.send(req.user);
});

const validateUser = (user) => {
  return true;
};

router.post("/signup", async (req, res) => {
  let userInfo = req.body;
  if (!userInfo || Object.keys(userInfo).length === 0) {
    return res
      .status(400)
      .json({ error: "There are no fields in the request body" });
  }
  // try {
  //     console.log('request recieved')
  //     const user = req.body;
  //     const userCtn = await users();
  //     validateUser(user)
  //     const { insertedId } = await userCtn.insertOne(user);
  //     if (insertedId) {
  //         return res.status(200).send({ message: 'Successfully created user' });
  //     } else {
  //         return res.status(500).send({ message: 'Unable to create user record' });
  //     }
  // } catch(e) {
  //     console.log(e)
  //     if(e.ERROR_TYPE === errorType.BAD_INPUT) {
  //         return res.status(400).send({ message: e.message });
  //     } else {
  //         return res.status(500).send({ message: 'Internal server error' });
  //     }
  // }
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
      userInfo.role
    );
    //res.json(newUser)
    res.status(200).send({message: 'Successfully created user' })
  } catch (e) {
    let status = e[0] ? e[0] : 500;
    let message = e[1] ? e[1] : "Internal Server Error";
    res.status(status).send({ error: message });
  }
});

router.post("/login", async (req, res) => {
  try{
  const userObj = req.body;
  const token = await userData.checkLogged(userObj.userName, userObj.password)
  res.cookie("token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
  return res.status(200).send({ message: "User successfully loggedin" });
  }catch(e){
    res.send(e)
  }
});

router.get("/check", authenticate, authorize(roleType.ADMIN), (req, res) => {
  return res.status(200).send({ message: "This is authorized" });
});

export default router;
