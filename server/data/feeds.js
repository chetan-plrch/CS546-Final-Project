import { feeds } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";

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
    const feedsCollection = await feeds();
    const feed = await feedsCollection.findOne({ _id: new ObjectId(feedId) });
    
    if(isUnLike){
      //Adding the userId to the unlikedd Array
      if (!feed.unliked.includes(userId)) {
        await feedsCollection.updateOne(
          { _id: new ObjectId(feedId) },
          { $push: { liked: userId } }
        );
      }

      //removing the userID if present in the liked Array
      if (feed.liked.includes(userId)) {
        await feedsCollection.updateOne(
          { _id: new ObjectId(feedId) },
          { $pull: { unliked: userId } }
        );
      }
    }else{
      //removing the userId from the unliked Array
      if (feed.unliked.includes(userId)) {
        await feedsCollection.updateOne(
          { _id: new ObjectId(feedId) },
          { $pull: { liked: userId } }
        );
      }
    }
  }
  
  

  export default {createFeed, getAll, updateLike, updateUnLike}