import { ObjectId } from "mongodb";
import { feedBack } from "../config/mongoCollections.js";
import validation from "../validations.js";

const createFeedBack = async (
  userID,
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
    userID = validation.checkId(userID, "userId");
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

  try {
    description = validation.checkString(description, " feed back description");
  } catch (e) {
    errors.push(e);
  }
  if (errors.length > 0) {
    throw [400, errors];
  }

  const feedBackCollection = await feedBack();
  userID = new ObjectId(userID);
  chatId = new ObjectId(chatId);
  let now = new Date();
  let feedBackDate = now.toISOString();
  let rating = {
    reconnect_probability: rate1,
    satisfied_with_chat: rate2,
    listener_rating: rate3,
  };
  const newfeedBack = {
    userID,
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
  res.userID = res.userID.toString();
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
      obj.userID = obj.userID.toString();
      obj.chatId = obj.chatId.toString();
    });
  } else {
    throw [404, "Error: No feedback found in the database"];
  }
  return res;
};

const getByUserId = async (userID) => {
  userID = validation.checkId(userID, "userID");

  const feedBackCollection = await feedBack();
  let res = [];
  res = await feedBackCollection
    .find({ userID: new ObjectId(userID) })
    .toArray();
  if (res.length > 0) {
    res.forEach((obj) => {
      obj._id = obj._id.toString();
      obj.userID = obj.userID.toString();
      obj.chatId = obj.chatId.toString();
    });
  } else {
    throw [404, "Error: No feedback found in the database"];
  }
  return res;
};

const getByFeedID = async (id) => {
  id = validation.checkId(id, "feedBack ID");

  const feedBackCollection = await feedBack();
  let res;
  res = await feedBackCollection.findOne({ _id: new ObjectId(id) });
  if (res === null) {
    throw [404, "Error: No feedback found with the ID"];
  }
  res._id = res._id.toString();
  res.userID = res.userID.toString();
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

const removeByUserId = async (userID) => {
  userID = validation.checkId(userID, "userID");

  const feedBackCollection = await feedBack();
  const deletionInfo = await feedBackCollection.deleteMany({
    userID: new ObjectId(userID),
  });
  if (!deletionInfo.acknowledged)
    throw [404, `Error: Could not delete feedback with id of ${id}`];
  let ans = {};
  ans.userID = userID;
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
  try {
    description = validation.checkString(description, " feed back description");
  } catch (e) {
    errors.push(e);
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
  ans.userID = ans.userID.toString();
  ans.chatId = ans.chatId.toString();
  return ans;
};

export default {
  createFeedBack,
  getAll,
  getByUserId,
  getByFeedID,
  remove,
  removeByUserId,
  update,
};
