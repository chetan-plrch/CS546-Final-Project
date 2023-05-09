import { Router } from "express";
import { journalData } from "../data/index.js";
import { ObjectId } from "mongodb";
const router = Router();

router.post('/', async (req, res) => {
  const { userId, message, date } = req.body;
  try {
    if (!userId || typeof userId !== 'string') {
      throw new Error('Invalid user ID');
    }

    if (!message || typeof message !== 'string') {
      throw new Error('Invalid message');
    }

    if (typeof date !== 'string' || isNaN(Date.parse(date))) { 
      throw new Error('Invalid date');
    }

    const result = await journalData.CreateJournal(userId, message, date);
    if (result) {
      return res.status(200).json(result);
    } else {
      throw new Error('Journal cannot be created');
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e.message });
  }
});

  
  router.get('/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      if (!ObjectId.isValid(userId)) {
        throw new Error('Invalid id');
      }
      const journal = await journalData.getJournalsByUser(userId);
      if (!journal) {
        throw new Error('No journal with that id');
      }
      return res.json({ journal });
    } catch (error) {
      console.log(error);
      if (error.message === 'Invalid id') {
        res.status(400).json({ error: 'Invalid id' });
      } else if (error.message === 'No journal with that id') {
        res.status(404).json({ error: 'No journal with that id' });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  });
  
  router.delete('/:id', async (req,res) =>{
    const id = req.params.id;
    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid journal ID' });
    }
  
    try {
      const message = await journalData.remove(id);
      if(!message){
        return res.status(404).json({ message: 'Journal not found' });
      }
      return res.json({ journalId: id, deleted: true });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

export default router;