// extra feature

import { ObjectId } from "mongodb";
import { users } from "../config/mongoCollections.js";
import { journal } from "../config/mongoCollections.js";
import validations from "../validations.js";

const CreateJournal = async (userId, message) => {
  let errors = [];
  try {
    userId = validations.checkId(userId, "userId");
  } catch (e) {
    errors.push(e);
  }

  try {
    message = validations.checkString(message, "journal message");
  } catch (e) {
    errors.push(e);
  }

  if (errors.length > 0) {
    throw [400, errors];
  }

  const userCtx = await users();
  const user = await userCtx.findOne(
    { _id: new ObjectId(userId) },
    { password: 0 }
  );
  if (!user) {
    throw [404, "User not found with this userId "];
  }
  let now = new Date();
  let journalDate = now.toISOString();

  const journaldb = await journal();
  const insert = await journaldb.insertOne({
    userId: userId,
    message: message,
    date: journalDate,
  });
  if (!insert.acknowledged || !insert.insertedId)
    throw [404, "Could not create new journal"];

  const insertedId = insert.insertedId.toString();
  return { journalId: insertedId };
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
  let errors = [];
  try {
    userId = validations.checkId(userId, "userId");
  } catch (e) {
    errors.push(e);
  }

  if (errors.length > 0) {
    throw [400, errors];
  }

  const journaldb = await journal();
  const journals = await journaldb.find({ userId: userId }).toArray();

  if (journals.length === 0) {
    throw [404,"No journals found for this user"];
  }
  return journals;
};

const remove = async (journalId) => {
  try {
    const journalCtx = await journal();
    const deletionInfo = await journalCtx.findOneAndDelete({
      _id: new ObjectId(journalId),
    });
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
