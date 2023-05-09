// extra feature

import { ObjectId } from "mongodb";
import { users } from "../config/mongoCollections.js";
import { journal } from "../config/mongoCollections.js";

const CreateJournal = async (userId, message, dateString) => {
  if (!userId || typeof userId !== "string") {
    throw new Error("Invalid user ID");
  }

  if (!message || typeof message !== "string") {
    throw new Error("Invalid Message");
  }

  if (typeof dateString !== "string" || isNaN(Date.parse(dateString))) {
    throw new Error("Invalid Date");
  }

  const date = new Date(dateString);

  try {
    const userdb = await users();
    const user = await userdb.findOne(
      { _id: new ObjectId(userId) },
      { password: 0 }
    );

    if (!user) {
      throw new Error("User not found with this userId ");
    }

    const journaldb = await journal();
    const insert = await journaldb.insertOne({
      userId: userId,
      message: message,
      date: date,
    });

    const insertedId = insert.insertedId.toString();

    return { journalId: insertedId };
  } catch (err) {
    throw new Error("Failed to create journal entry");
  }
};

const getJournal = async (id) => {
  if (!id || typeof id !== "string" || id.trim().length === 0) {
    throw new Error("Invalid id");
  }
  id = id.trim();

  if (!ObjectId.isValid(id)) {
    throw new Error("invalid object ID");
  }

  const journaldb = await journal();
  const journals = await journaldb.find({ userId: id }).toArray();
  if (journals === null) {
    throw new Error("No journal with that id");
  }
  return journals;
};

const getJournalsByUser = async (userId) => {
  if (!userId || typeof userId !== "string" || userId.trim().length === 0) {
    throw new Error("Invalid user id");
  }

  userId = userId.trim();

  if (!ObjectId.isValid(userId)) {
    throw new Error("Invalid object ID");
  }

  const journaldb = await journal();
  const journals = await journaldb.find({ userId: userId }).toArray();

  if (journals.length === 0) {
    throw new Error("No journals found for this user");
  }

  return journals;
};

const remove = async (journalId) => {
  try {
    const journalCtx = await journal();
    const deletionInfo = await journalCtx.findOneAndDelete({ _id: new ObjectId(journalId) });
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete journal with id ${journalId}`;
    }
    return true;
  } catch (error) {
    console.error(`Error occurred while deleting journal: ${error}`);
    return false;
  }
};

export default { CreateJournal, getJournal, remove, getJournalsByUser };
