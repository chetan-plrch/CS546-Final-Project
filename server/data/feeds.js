import { feeds } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import validations from "../validations.js";

  const createFeed = async (title, description, type, images) => {
    if (!title || typeof title !== 'string') {
      throw new Error('Title is required and must be a string');
    }
  
    if (!description || typeof description !== 'string') {
      throw new Error('Description is required and must be a string');
    }
  
    if (!type || typeof type !== 'string') {
      throw new Error('Type is required and must be a string');
    }
  
    if (!Array.isArray(images) || images.some(img => typeof img !== 'string')) {
      throw new Error('Images are required and must be an array of strings');
    }
  
    try {
      const feed = {
        title,
        description,
        type,
        images,
        createdAt: new Date().toISOString(),
        liked:[],
        unliked:[],
        comments:{},
        saved:[]
      };
      
      const feedsCollection = await feeds();
      const result = await feedsCollection.insertOne(feed);
      const insertedId = result.insertedId.toString();
      console.log(`New feed created with ID: ${insertedId}`);
      return insertedId;
    } catch (error) {
      throw new Error(`Cannot create feed: ${error.message}`);
    }
  };
  
  const getAll = async() =>{
    const allFeeds = await feeds();

    const findAll = await allFeeds.find({}).toArray();
    return findAll;

    // return findAll.map((feed) =>({
    //     _id: feed._id.toString(),
    //     title: feed.title,
    //     description: feed.description,
    //     type: feed.type,
    //     images: feed.images,
    // }));

  };

  const updateLike = async(userId, feedId, isLike)=>{
    let errors = []
    try{
      userId = validations.checkId(userId,"user Id")
    }catch(e){
      errors.push(e)
    }
    try{
      feedId = validations.checkId(feedId,"feed Id")
    }catch(e){
      errors.push(e)
    }
    try{
      isLike = validations.checkBoolean(isLike,"isLike")
    }catch(e){
      errors.push(e)
    }

    if (errors.length > 0) {
      throw [400, errors];
    }

    const feedsCollection = await feeds();
    const feed = await feedsCollection.findOne({ _id: new ObjectId(feedId) });

    if(isLike){
      //Adding the userId to the Liekd Array
      if (!feed.liked.includes(userId)) {
        await feedsCollection.updateOne(
          { _id: new ObjectId(feedId) },
          { $push: { liked: userId } }
        );
      }

      //removing the userID if present in the unliked Array
      if (feed.unliked.includes(userId)) {
        await feedsCollection.updateOne(
          { _id: new ObjectId(feedId) },
          { $pull: { unliked: userId } }
        );
      }
    }else{
      //removing the userId from the liked Array
      if (feed.liked.includes(userId)) {
        await feedsCollection.updateOne(
          { _id: new ObjectId(feedId) },
          { $pull: { liked: userId } }
        );
      }
    }
    
  }

  const updateUnLike = async(userId, feedId, isUnLike)=>{
    let errors = []
    try{
      userId = validations.checkId(userId,"user Id")
    }catch(e){
      errors.push(e)
    }
    try{
      feedId = validations.checkId(feedId,"feed Id")
    }catch(e){
      errors.push(e)
    }
    try{
      isUnLike = validations.checkBoolean(isUnLike,"isUnLike")
    }catch(e){
      errors.push(e)
    }

    if (errors.length > 0) {
      throw [400, errors];
    }

    const feedsCollection = await feeds();
    const feed = await feedsCollection.findOne({ _id: new ObjectId(feedId) });

    
    if(isUnLike){
      //Adding the userId to the unlikedd Array
      if (!feed.unliked.includes(userId)) {
        await feedsCollection.updateOne(
          { _id: new ObjectId(feedId) },
          { $push: { unliked: userId } }
        );
      }

      //removing the userID if present in the liked Array
      if (feed.liked.includes(userId)) {
        await feedsCollection.updateOne(
          { _id: new ObjectId(feedId) },
          { $pull: { liked: userId } }
        );
      }
    }else{
      //removing the userId from the unliked Array
      if (feed.unliked.includes(userId)) {
        await feedsCollection.updateOne(
          { _id: new ObjectId(feedId) },
          { $pull: { unliked: userId } }
        );
      }
    }
  }
  
  const updateComment = async (userId, feedId, message) => {
    let errors = []
    try{
      userId = validations.checkId(userId,"user Id")
    }catch(e){
      errors.push(e)
    }
    try{
      feedId = validations.checkId(feedId,"feed Id")
    }catch(e){
      errors.push(e)
    }
    try{
      message = validations.checkString(message,"Comment message")
    }catch(e){
      errors.push(e)
    }

    if (errors.length > 0) {
      throw [400, errors];
    }

    const feedsCollection = await feeds();
    const feed = await feedsCollection.findOne({ _id: new ObjectId(feedId) });
  
    if (feed.comment.hasOwnProperty(userId)) {
      // If the user has already commented, append the new message to the existing array
      await feedsCollection.updateOne(
        { _id: new ObjectId(feedId) },
        { $push: { [`comment.${userId}`]: message } }
      );
    } else {
      // If the user has not commented before, create a new array with the new message
      await feedsCollection.updateOne(
        { _id: new ObjectId(feedId) },
        { $set: { [`comment.${userId}`]: [message] } }
      );
    }
  };

  const savePost = async(userId, feedId, isSave)=>{
    let errors = []
    try{
      userId = validations.checkId(userId,"user Id")
    }catch(e){
      errors.push(e)
    }
    try{
      feedId = validations.checkId(feedId,"feed Id")
    }catch(e){
      errors.push(e)
    }
    try{
      isSave = validations.checkBoolean(isSave,"isSave")
    }catch(e){
      errors.push(e)
    }

    if (errors.length > 0) {
      throw [400, errors];
    }
    const feedsCollection = await feeds();
    const feed = await feedsCollection.findOne({ _id: new ObjectId(feedId) });

    if(isSave){
      if (!feed.saved.includes(userId)) {
        await feedsCollection.updateOne(
          { _id: new ObjectId(feedId) },
          { $push: { saved: userId } }
        );
      }
    }else{
      if (feed.saved.includes(userId)) {
        await feedsCollection.updateOne(
          { _id: new ObjectId(feedId) },
          { $pull: { saved: userId } }
        );
      }
    }
  }
  
  
  export default {createFeed, getAll, updateLike, updateUnLike, updateComment, savePost}