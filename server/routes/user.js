import { Router } from "express";
import { roleType } from "../util.js";
import { authenticate, authorize } from "../middleware/index.js";
import { userData } from "../data/index.js";
import validation from "../validations.js";
import jwt from "jsonwebtoken";
const router = Router();

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
  let errors = [];
  try {
    userInfo.firstName = validation.checkString(
      userInfo.firstName,
      "First name"
    );
  } catch (e) {
    errors.push(e);
  }

  try {
    userInfo.lastName = validation.checkString(userInfo.lastName, "Last Name");
  } catch (e) {
    errors.push(e);
  }

  try {
    userInfo.username = validation.checkString(userInfo.username, "User name");
  } catch (e) {
    errors.push(e);
  }
  try {
    userInfo.username = validation.checkUsername(userInfo.username);
  } catch (e) {
    errors.push(e);
  }

  try {
    userInfo.email = validation.checkMailID(userInfo.email);
  } catch (e) {
    errors.push(e);
  }

  try {
    userInfo.password = validation.checkPassword(userInfo.password);
  } catch (e) {
    errors.push(e);
  }

  try {
    userInfo.age = validation.checkAge(userInfo.age);
  } catch (e) {
    errors.push(e);
  }

  try {
    userInfo.city = validation.checkString(userInfo.city, "city");
  } catch (e) {
    errors.push(e);
  }

  try {
    userInfo.state = validation.checkString(userInfo.state, "state");
  } catch (e) {
    errors.push(e);
  }

  try {
    userInfo.gender = validation.checkGender(userInfo.gender);
  } catch (e) {
    errors.push(e);
  }

  try {
    userInfo.role = validation.checkRole(userInfo.role);
  } catch (e) {
    errors.push(e);
  }

  if (errors.length > 0) {
    res.status(400).send({ errors });
    return;
  }

  try {
    const newUser = await userData.create(
      userInfo.firstName,
      userInfo.lastName,
      userInfo.username,
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
    console.log(newUser);
    res.status(200).send({ message: "Successfully created user" });
  } catch (e) {
    let status = e[0] ? e[0] : 500;
    let message = e[1] ? e[1] : "Internal Server Error";
    //console.log(message);
    res.status(status).json({ error: message });
    //console.log(e);
  }
});

router.post("/login",async (req, res) => {
    const userObj = req.body;

    if (!userObj || Object.keys(userObj).length === 0) {
      return res
        .status(400)
        .json({ error: "There are no fields in the request body" });
    }
    //validation for the req body
    let errors = [];

    if (userObj.username.trim() === "" || !userObj.username) {
      errors.push("Error: Enter username");
    }
    if (userObj.password.trim() === "" || !userObj.password) {
      errors.push("Error: Enter password");
    }

    try {
      userObj.username = validation.checkString(userObj.username, "Username");
    } catch (e) {
      errors.push(e);
    }
    try {
      userObj.username = validation.checkUsername(userObj.username);
    } catch (e) {
      errors.push(e);
    }

    try {
      userObj.password = validation.checkPassword(userObj.password);
    } catch (e) {
      errors.push(e);
    }

    if (errors.length > 0) {
      res.status(400).send({ errors });
      return;
    }

    try {
      const token = await userData.checkLogged(
        userObj.username.trim(),
        userObj.password.trim()
      );
      //console.log(token);
      const fn = jwt.decode(token);
      res.cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      const message = `${fn.firstName}, Welcome Back`;
      return res.status(200).send({ message });
    } catch (e) {
      let status = e[0] ? e[0] : 500;
      let message = e[1] ? e[1] : "Internal Server Error";
      //console.log(message);
      res.status(status).json({ error: message });
      //console.log(e);
    }
  },
  authenticate
);


router.get("/check", authenticate, authorize(roleType.ADMIN), (req, res) => {
  return res.status(200).send({ message: "This is authorized" });
});

export default router;
