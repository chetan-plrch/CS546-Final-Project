// extra feature

import { ObjectId } from "mongodb";
import { users } from "../config/mongoCollections.js";
import { journal } from "../config/mongoCollections.js";

// const CreateJournal = async(userId ,message , date) => {
    
//     if (!userId || typeof userId !== 'string'){
//         throw new Error ('Invalid user ID')
//     } 

//     if (!message || typeof message !== 'string'){
//         throw new Error ('Invalid Message')
//     }

//     if (typeof date !== 'object' || isNaN(date.getTime())) {
//         throw new Error('Invalid Date');
//       }
      
//       try{
//         const userdb = await users();
//         const user = await userdb.findOne({ _id: new ObjectId(userId) })

//         if(!user) {
//             throw new Error('User not found with this userId ')
//         }

//         const journaldb = await journal();
//         const insert = await journaldb.insertOne({
//             userId: userId,
//             message: message,
//             date: date
//         });

//         const insertedId = insert.insertedId.toString();
        
//         return { journalId: insertedId };
//              } catch (err) {
//             throw new Error('Failed to create journal entry');
//     }
// };

const CreateJournal = async(userId ,message , dateString) => {
    
  if (!userId || typeof userId !== 'string'){
      throw new Error ('Invalid user ID')
  } 

  if (!message || typeof message !== 'string'){
      throw new Error ('Invalid Message')
  }

  if (typeof dateString !== 'string' || isNaN(Date.parse(dateString))) {
      throw new Error('Invalid Date');
  }

  const date = new Date(dateString);
    
  try{
      const userdb = await users();
      const user = await userdb.findOne({ _id: new ObjectId(userId) }, { password: 0 })

      if(!user) {
          throw new Error('User not found with this userId ')
      }

      const journaldb = await journal();
      const insert = await journaldb.insertOne({
          userId: userId,
          message: message,
          date: date
      });

      const insertedId = insert.insertedId.toString();
      
      return { journalId: insertedId };
  } catch (err) {
      throw new Error('Failed to create journal entry');
  }
};


const getJournal = async (id) => {

    if (!id || typeof id !== "string" || id.trim().length === 0) {
      throw new Error("Invalid id");
    }
     id = id.trim();
  
     if (!ObjectId.isValid(id)){
      throw new Error ('invalid object ID');
     } 
  
     const journaldb = await journal();
     const getID = await journaldb.findOne({_id: new ObjectId(id)});
     if(getID === null){
      throw new Error("No journal with that id");
     }
  
     getID._id = getID._id.toString();
     return getID;
    }

    const remove = async (id) => {
        if (!id || typeof id !== "string" || id.trim().length === 0) {
          throw new Error("Invalid ID provided");
        }
        id = id.trim();
      
        if (!ObjectId.isValid(id)){
          throw new Error ('invalid object ID');
         } 
      
        const db = await journal();
      
        const journal = await db.findOne({ _id: new ObjectId(id) });
        if (!journal) {
          throw new Error("journal not found");
        }
      
        await db.deleteOne({ _id: new ObjectId(id) });
      
        const message =  "Journal has been successfully deleted!";
        return message;
      };

export default {CreateJournal, getJournal, remove}