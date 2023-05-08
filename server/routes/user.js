import { Router } from "express";
import { authenticate,notAuthenticate, destroyToken } from "../middleware/index.js";
import { userData } from "../data/index.js";
import validation, {validateLoginRequest, validateName} from "../validations.js";
import { unblockConnection} from '../data/chat.js'
import { errorType, checkEmailExists, checkUsernameExists } from "../util.js";
const router = Router();
import { ObjectId } from "mongodb";


router.get("/user", authenticate, async (req, res) => {
  delete req.user.password
  return res.send(req.user);
});

router.get("/all-users", async (req, res) => {
  try {
    const response = await userData.getAllUsers(req.query);
    return res.status(200).send(response);
  } catch (e) {
    return res.status(e[0] || 500).send({ message: e[1] || "Internal Server Error" });
  };
});

router.post("/signup", notAuthenticate, async (req, res) => {
  let userInfo = req.body;
  if (!userInfo || Object.keys(userInfo).length === 0) {
    return res
      .status(400)
      .json({ error: "There are no fields in the request body" });
  }
  //validating the request body
  let errors = [];
  try {
    userInfo.firstName = validateName(userInfo.firstName, "First name");
  } catch (e) {
    errors.push(e);
  }

  try {
    userInfo.lastName = validateName(userInfo.lastName, "Last Name");
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

  if(userInfo.password !== userInfo.confirmPassword){
      errors.push("Passwords do not match")
   }

  try {
    userInfo.age = validation.checkAge(userInfo.age);
  } catch (e) {
    errors.push(e);
  }

  if (userInfo.city) {
  try {
    userInfo.city = validateName(userInfo.city, "city");
  } catch (e) {
    errors.push(e);
  }
}

if(userInfo.role === "listener"){
    userInfo.isAnonymous = false
}

if(userInfo.state){
  try {
    userInfo.state = validateName(userInfo.state, "state");
  } catch (e) {
    errors.push(e);
  }
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

  if (userInfo.profilePic) {
    try {
      userInfo.profilePic = validation.checkImage(userInfo.profilePic);
    } catch (e) {
      errors.push(e);
    }
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
    res.status(200).send({ message: "Successfully created user" });
  } catch (e) {
    res.status(e[0] || 500).json({ error: e?.[1] || "Internal Server Error" });
  }
});

router.post("/login", notAuthenticate ,async (req, res) => {
  try {
    let {username, password} = validateLoginRequest(req.body);
    const { user, token } = await userData.loginUser(username, password);
    const cookieSpecifications = { maxAge: 24 * 60 * 60 * 1000, httpOnly: false };
    res.cookie("role", user.role, cookieSpecifications);
    res.cookie("firstname", user.firstName, cookieSpecifications);
    res.cookie("userId", user._id.toString(), cookieSpecifications);
    res.cookie("token", token, {...cookieSpecifications, httpOnly: true});

    const name = user?.isAnonymous ? '' : `, ${user?.firstName}`;
    return res.status(200).send({ message: `Welcome back${name}!` });

    } catch (e) {
    res.status(e?.[0] || 500).json({error: e?.[1] || "Internal Server Error"});
    };
  }
);

router.get("/is-loggedin", authenticate, (_req, res) => {
  return res.status(200).send({ message: "This is authorized" });
});

router.get('/:id', async (req,res) =>{
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid id');
    }
    const user = await userData.get(id);
    console.log(user);
    if(!user){
      throw new Error('No user with that id');
    }
    res.status(200).json({user});
  } catch (error) {
    console.log(error);
    if (error.message === 'Invalid id') {
      res.status(400).json({ error: 'Invalid id' });
    } else if (error.message === 'No user with that id') {
      res.status(404).json({ error: 'No user with that id' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } 
}).delete(async (req,res) => {
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

router.put("/update", authenticate, async (req, res) => {
  try {
    const userId = validation.checkId(req.user._id.toString());

    const userInfo = req.body
    userInfo.username = validation.checkUsername(userInfo.username);
    userInfo.firstName = validation.checkString(userInfo.firstName);
    userInfo.lastName = validation.checkString(userInfo.lastName);
    userInfo.email = validation.checkMailID(userInfo.email)
    userInfo.age = validation.checkAge(userInfo.age);
    validation.checkBoolean(userInfo.isAnonymous, 'isAnonymous');

    if (userInfo.password) {
      userInfo.password = validation.checkPassword(userInfo.password);
    }
    if (userInfo.city) {
      userInfo.city = validation.checkString(userInfo.city);
    }
    if (userInfo.state) {
      userInfo.state = validation.checkString(userInfo.state);
    }
    if (userInfo.profilePic) {
      validation.checkImage(userInfo.profilePic);
    }

    await checkEmailExists(userId, userInfo.email)
    await checkUsernameExists(userId, userInfo.username)
    const updateUser = await userData.update({ id: userId, ...userInfo });
    return res.status(200).json(updateUser);
  } catch (e) {
    if (e.type === errorType.BAD_INPUT) {
      return res.status(400).json({ error: e.message });
    }
    return res.status(500).json({ error: 'Error: Internal server error' });
  }
})

router.put('/delete', authenticate, async (req, res, next) => {
  const userId = req.user._id.toString();
  try {
    const result = await userData.updateUserRandom(userId, req.body);
    
    return destroyToken(req, res, next)
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get('/blocked/users', authenticate, async (req, res) => {
    try {
      const userId = req.user._id.toString();
      const blockedUsers = await userData.getAllBlockedUsers(userId);
      return res.status(200).json(blockedUsers);
    } catch(e) {
      if (e.type === errorType.BAD_INPUT) {
          return res.status(400).send({ message: e.message })
      } else if (e.type === errorType.NOT_FOUND) {
          return res.status(404).send({ message: e.message })
      }
      return res.status(500).send({ message: 'Error: Internal server error' })
    }
});


router.route('user/unblock/:id').put( async (req, res) => {
    try {
        // const { unblockConnectionId } = req.body
        const id = req.params.id;
        const unblockConIdTrimmed = validator.checkId(id, 'unblockUserId')
        await unblockConnection(req.user._id.toString(), unblockConIdTrimmed)
        return res.status(200).send({ message: ' unblocked successfully' })
    } catch(e) {
        if (e.type === errorType.BAD_INPUT) {
            return res.status(400).send({ message: e.message })
        } else if (e.type === errorType.NOT_FOUND) {
            return res.status(404).send({ message: e.message })
        }
        return res.status(500).send({ message: 'Internal server error' })
    }
});

export default router;
