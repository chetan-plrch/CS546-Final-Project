import { ObjectId } from "mongodb";
import { users } from "./config/mongoCollections.js";
import validation from "./validations.js";

export const roleType = {
  ADMIN: "ADMIN",
  USER: "USER",
};

export const errorType = {
  BAD_INPUT: "BAD_INPUT",
  UNAUTHORIZED: "UNAUTHORIZED",
  NOT_FOUND: "NOT_FOUND",
};

export const getError = (e) => {
  if (e.type === errorType.BAD_INPUT) {
    return { status: 400, message: e.message };
  } else if (e.type === errorType.NOT_FOUND) {
    return { status: 404, message: e.message };
  }
  return { status: 500, message: "Internal server error" };
};

export const getChatUserIds = (chats) => {
  const usersMap = [];
  const usersSet = new Set();
  chats.forEach((chat) => {
    chat.users.forEach((userId) => {
      if (!usersSet.has(userId)) {
        usersSet.add(userId);
        usersMap.push(userId);
      }
    });
  });
  return usersMap.map((userId) => new ObjectId(userId));
};

export const formatUser = (user) => {
  if (user.isAnonymous) {
    return {
      _id: user._id.toString(),
      firstName: "Anonymous",
      age: "N/A",
      email: "anonymous@leaf.com",
      gender: "N/A",
      city: "N/A",
      state: "N/A",
      lastName: "User",
      profilePic: null,
      username: user._id.toString(),
    };
  } else {
    return {
      _id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      profilePic: user.profilePic,
      username: user.username,
      role: user.role
    };
  }
};

export const formatListOfUsers = (users) => {
  return users.map((user) => {
    return formatUser(user);
  });
};

export const removeBlockedChats = (chats, blockedUserIds) => {
  const myChats = chats.reduce((acc, chat) => {
    const found = blockedUserIds.find((blockId) =>
      chat.users.includes(blockId)
    );
    if (found) {
      return acc;
    } else {
      return [...acc, chat];
    }
  }, []);

  return myChats.sort((chatA, chatB) => {
    const topConvA = chatA.conversation;
    const topConvB = chatB.conversation;
    if (topConvA && topConvB) {
      const aSentAt = topConvA[topConvA.length - 1].sentAt;
      const bSentAt = topConvB[topConvB.length - 1].sentAt;

      return new Date(bSentAt).valueOf() - new Date(aSentAt).valueOf();
    }
    return 0;
  });
};

export const errorObject = (type, msg) => {
  const e = new Error(msg);
  e.type = type;
  return e;
};

export async function checkEmailExists(userId, email) {
  const userCollection = await users();
  const emailExists = await userCollection.findOne(
    { email, _id: { $ne: new ObjectId(userId) } },
    { projection: { password: 0 } }
  );
  if (emailExists) {
    throw errorObject(errorType.BAD_INPUT, "Error: Email already in use");
  }
}

export async function checkUsernameExists(userId, username) {
  const userCollection = await users();
  const usernameExists = await userCollection.findOne(
    { username, _id: { $ne: new ObjectId(userId) } },
    { projection: { password: 0 } }
  );
  if (usernameExists) {
    throw errorObject(errorType.BAD_INPUT, "Error: Username already in use");
  }
}

export const validateUpdateUser = (userInfo) => {
  userInfo.username = validation.checkUsername(userInfo.username);
  userInfo.firstName = validation.checkString(userInfo.firstName);
  userInfo.lastName = validation.checkString(userInfo.lastName);
  userInfo.email = validation.checkMailID(userInfo.email);
  userInfo.age = validation.checkAge(userInfo.age);
  if (userInfo.password) {
    userInfo.password = validation.checkPassword(userInfo.password);
  }
  if (userInfo.city) {
    userInfo.city = validation.checkString(userInfo.city);
  }
  if (userInfo.state) {
    userInfo.state = validation.checkString(userInfo.state);
  }

  validation.checkBoolean(userInfo.isAnonymous, "isAnonymous");

  if (userInfo.profilePic) {
    validation.checkImage(userInfo.profilePic);
  }
  return userInfo;
};
