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
  let errors = []
  try{
    userID = validation.checkId(userID, "userId")
  }catch(e){
    errors.push(e)
  }
  try{
    chatId = validation.checkId(chatId, "chatId")
  }catch(e){
    errors.push(e)
  }

  try{
    rate1 = validation.checkRating(rate1,"reconnect_probability")
  }catch(e){
    errors.push(e)
  }
  try{
    rate2 = validation.checkRating(rate2,"satisfied_with_chat")
  }catch(e){
    errors.push(e)
  }
  try{
    rate3 = validation.checkRating(rate3,"listener_rating")
  }catch(e){
    errors.push(e)
  }

  try {
    description = validation.checkString(description," feed back description");
  } catch (e) {
    errors.push(e)
  }
  if (errors.length > 0) {
    throw [400, errors];
  }

  const feedBackCollection = await feedBack();
  userID = new ObjectId(userID)
  chatId = new ObjectId(chatId)
  let now = new Date();
  let feedBackDate = now.toISOString();
  let rating = {
    "reconnect_probability": rate1,
    "satisfied_with_chat": rate2,
    "listener_rating": rate3,
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
  return res;
};

export default { createFeedBack };
