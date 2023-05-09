import { Router } from "express";
import { journalData } from "../data/index.js";
import { ObjectId } from "mongodb";
const router = Router();
import validations from "../validations.js";

router.post("/", async (req, res) => {
  let journalInfo = req.body;
  let errors = [];
  try {
    journalInfo.userId = validations.checkId(journalInfo.userId, "userId");
  } catch (e) {
    console.log(e);
    errors.push(e?.message);
  }

  try {
    journalInfo.message = validations.checkString(
      journalInfo.message,
      "journal message"
    );
  } catch (e) {
    console.log(e);
    errors.push(e?.message);
  }

  if (errors.length > 0) {
    return res.status(400).send(errors);
  }
  try {
    const result = await journalData.CreateJournal(
      journalInfo.userId,
      journalInfo.message
    );
    return res.json(result);
  } catch (e) {
    console.log(e);
    if (e.type === errorType.BAD_INPUT) {
      return res.status(400).json({ error: e.message });
    }
    return res.status(500).json({ error: 'Error: Internal server error' });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let userId = req.params.id;
    let errors = [];
    try {
      userId = validations.checkId(userId, "userId");
    } catch (e) {
      console.log(e);
      errors.push(e?.message);
    }
    if (errors.length > 0) {
      return res.status(400).send(errors);
    }

    const journal = await journalData.getJournalsByUser(userId);
    return res.json({ journal });
  } catch (e) {
    if (e.type === errorType.BAD_INPUT) {
      return res.status(400).json({ error: e.message });
    }
    return res.status(500).json({ error: 'Error: Internal server error' });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid journal ID" });
  }

  try {
    const message = await journalData.remove(id);
    if (!message) {
      return res.status(404).json({ message: "Journal not found" });
    }
    return res.json({ journalId: id, deleted: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
