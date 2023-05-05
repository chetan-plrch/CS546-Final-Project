import { feeds } from "../config/mongoCollections.js";

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

  const getFeedById = async (id) => {
    if (!id || typeof id !== 'string') {
      throw new Error('ID is required and must be a string');
    }
  
    try {
      const feedsCollection = await feeds();
      const feed = await feedsCollection.findOne({ _id: ObjectId(id) });
  
      if (!feed) {
        throw new Error(`Feed with ID ${id} not found`);
      }
  
      return {
        _id: feed._id.toString(),
        title: feed.title,
        description: feed.description,
        type: feed.type,
        images: feed.images,
      };
    } catch (error) {
      throw new Error(`Cannot get feed: ${error.message}`);
    }
  };
  
  
  const getAll = async() =>{
    const allFeeds = await feeds();

    const findAll = await allFeeds.find({}).toArray();

    return findAll.map((feed) =>({
        _id: feed._id.toString(),
        title: feed.title,
        description: feed.description,
        type: feed.type,
        images: feed.images,
    }));

  };

  export default {createFeed, getFeedById,getAll}