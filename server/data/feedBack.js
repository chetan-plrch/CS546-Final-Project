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
  

  const feedBackCollection = await feedBack();
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
  return res;
};

export default { createFeedBack };
