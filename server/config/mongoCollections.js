import { dbConnection } from './mongoConnection.js';

/* This will allow you to have one reference to each collection per app */
/* Feel free to copy and paste this this */
const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

/* Now, you can list your collections here: */
export const users = getCollectionFn('users');
export const feedBack = getCollectionFn('feedBack');
export const chats = getCollectionFn('chats')
export const sockets = getCollectionFn('sockets')

/**
 * User authentication
 * 
 * User model:
 * {
 *  id,
 *  username, 
 *  firstname, 
 *  lastname,
 *  password,
 *  email,
 *  gender
 *  type
 * }
 * 
 * API's
 * POST - /signup
 * POST - /login
 * GET - /user
 * 
 * Chat model:
 * {
 *   id,
 *   members: [user1, user2],
 *   sender: user,
 *   message,
 *   timestamp
 * }
 * 
 * API's
 * GET - /chat - Get the chat history of the two users
 * POST - /chat - Post the chat/message of the chat between two users
 * 
 */