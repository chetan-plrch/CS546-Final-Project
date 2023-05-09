import { ObjectId } from "mongodb";
import { feedBack,users } from "../config/mongoCollections.js";
import validation from "../validations.js";
import { getChat } from "./chat.js";
import {userData} from "./index.js"

const createFeedBack = async (
  userId,
  chatId,
  isPublic,
  rate1,
  rate2,
  rate3,
  description
) => {
  //validation of the feedBack data
  let errors = [];
  try {
    userId = validation.checkId(userId, "userId");
  } catch (e) {
    errors.push(e);
  }
  try {
    chatId = validation.checkId(chatId, "chatId");
  } catch (e) {
    errors.push(e);
  }

  try {
    rate1 = validation.checkRating(rate1, "reconnect_probability");
  } catch (e) {
    errors.push(e);
  }
  try {
    rate2 = validation.checkRating(rate2, "satisfied_with_chat");
  } catch (e) {
    errors.push(e);
  }
  try {
    rate3 = validation.checkRating(rate3, "listener_rating");
  } catch (e) {
    errors.push(e);
  }
  if(description){
    try {
      description = validation.checkString(description, " feedback description");
    } catch (e) {
      errors.push(e);
    }
  }

  if (errors.length > 0) {
    throw [400, errors];
  }
  const userCtx = await users();
  // let user = await userCtx.findOne({user})


  const feedBackCollection = await feedBack();
  const feedBackExistsForChat = await feedBackCollection.findOne({userId: new ObjectId(userId),chatId: new ObjectId(chatId)})
  if(feedBackExistsForChat){
    throw [404, "FeedBack already exist,cannot give a new Feedback, you can only update the Feedback"]
  }

  userId = new ObjectId(userId);
  chatId = new ObjectId(chatId);
  let now = new Date();
  let feedBackDate = now.toISOString();
  let rating = {
    reconnect_probability: rate1,
    satisfied_with_chat: rate2,
    listener_rating: rate3,
  };
  const newfeedBack = {
    userId,
    chatId,
    isPublic,
    rating,
    description,
    feedBackDate,
  };
  const insertInfo = await feedBackCollection.insertOne(newfeedBack);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw [404, "Could not create new feedback"];

  let feedBackId = insertInfo.insertedId;
  let res = {};
  res = await feedBackCollection.findOne({ _id: feedBackId });
  res._id = res._id.toString();
  res.userId = res.userId.toString();
  res.chatId = res.chatId.toString();
  return res;
};

const getAll = async (isview) => {
  const feedBackCollection = await feedBack();
  let res = [];
  if (isview === true || isview === "true") {
    res = await feedBackCollection.find({ isPublic: true }).toArray();
  } else if (isview === false || isview === "false") {
    res = await feedBackCollection.find({ isPublic: false }).toArray();
  } else {
    res = await feedBackCollection.find({}).toArray();
  }

  if (res.length > 0) {
    res.forEach((obj) => {
      obj._id = obj._id.toString();
      obj.userId = obj.userId.toString();
      obj.chatId = obj.chatId.toString();
    });
  } else {
    throw [404, "Error: No feedback found in the database"];
  }
  return res;
};

const getByuserId = async (userId) => {
  userId = validation.checkId(userId, "userId");

  const feedBackCollection = await feedBack();
  let res = [];
  res = await feedBackCollection
    .find({ userId: new ObjectId(userId) })
    .toArray();
  if (res.length > 0) {
    res.forEach((obj) => {
      obj._id = obj._id.toString();
      obj.userId = obj.userId.toString();
      obj.chatId = obj.chatId.toString();
    });
  } 
  else {
    throw [404, "Error: No feedback found in the database"];
  }
  return res;
};

const getByFeedId = async (id) => {
  id = validation.checkId(id, "feedBack ID");

  const feedBackCollection = await feedBack();
  let res;
  res = await feedBackCollection.findOne({ _id: new ObjectId(id) });
  if (res === null) {
    throw [404, "Error: No feedback found with the ID"];
  }
  res._id = res._id.toString();
  res.userId = res.userId.toString();
  res.chatId = res.chatId.toString();
  return res;
};

const getByChatId = async (chatId, userId) => {
  //chatId = chatId.toString();
  chatId = validation.checkId(chatId, "feedBack ID");
  const feedBackCollection = await feedBack();
  let res;
  res = await feedBackCollection.findOne({ userId: new ObjectId(userId), chatId: new ObjectId(chatId) });
  if (res === null) {
    throw [404, "Error: No feedback found with the ID"];
  }
  res._id = res._id.toString();
  res.userId = res.userId.toString();
  res.chatId = res.chatId.toString();
  return res;
};

const remove = async (id) => {
  id = validation.checkId(id, "feedBack ID");

  const feedBackCollection = await feedBack();
  const deletionInfo = await feedBackCollection.findOneAndDelete({
    _id: new ObjectId(id),
  });
  if (deletionInfo.lastErrorObject.n === 0)
    throw [404, `Error: Could not delete feedback with id of ${id}`];
  let ans = {};
  ans.feedBackId = deletionInfo.value._id.toString();
  ans.deleted = true;
  return ans;
};

const removeByuserId = async (userId) => {
  userId = validation.checkId(userId, "userId");

  const feedBackCollection = await feedBack();
  const deletionInfo = await feedBackCollection.deleteMany({
    userId: new ObjectId(userId),
  });
  if (!deletionInfo.acknowledged)
    throw [404, `Error: Could not delete feedback with id of ${id}`];
  let ans = {};
  ans.userId = userId;
  ans.feedBackNumber = deletionInfo.deletedCount;
  ans.deleted = deletionInfo.acknowledged;
  return ans;
};

const update = async (id, isPublic, rate1, rate2, rate3, description) => {
  //validations
  let errors = [];
  try {
    id = validation.checkId(id, "feedBackId");
  } catch (e) {
    errors.push(e);
  }
  try {
    rate1 = validation.checkRating(rate1, "reconnect_probability");
  } catch (e) {
    errors.push(e);
  }
  try {
    rate2 = validation.checkRating(rate2, "satisfied_with_chat");
  } catch (e) {
    errors.push(e);
  }
  try {
    rate3 = validation.checkRating(rate3, "listener_rating");
  } catch (e) {
    errors.push(e);
  }
  if(description){
    try {
      description = validation.checkString(description, " feed back description");
    } catch (e) {
      errors.push(e);
    }
  }
  
  if (errors.length > 0) {
    throw [400, errors];
  }

  let rating = {
    reconnect_probability: rate1,
    satisfied_with_chat: rate2,
    listener_rating: rate3,
  };

  let now = new Date();
  let feedBackDate = now.toISOString();
  let updatedFeedBack = {
    isPublic: isPublic,
    rating,
    description: description,
    feedBackDate,
  };
  const feedBackCollection = await feedBack();
  const updateInfo = await feedBackCollection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: updatedFeedBack },
    { returnDocument: "after" }
  );
  if (updateInfo.lastErrorObject.n === 0)
    throw [404, "Error: Update failed! Could not update post"];
  const ans = updateInfo.value;
  ans._id = ans._id.toString();
  ans.userId = ans.userId.toString();
  ans.chatId = ans.chatId.toString();
  return ans;
};

const getFirstnames = async(chatId, userId)=>{
  const chatInfo = await getChat(chatId);
  //console.log(chatInfo);
  if(chatInfo){
    const otherUserId = chatInfo.users.find(id => id !== userId);
    const userInfo = await userData.get(otherUserId);
    return userInfo.firstName;
  }
}


export default {
  createFeedBack,
  getAll,
  getByuserId,
  getByFeedId,
  remove,
  removeByuserId,
  update,
  getByChatId,
  getFirstnames
};
