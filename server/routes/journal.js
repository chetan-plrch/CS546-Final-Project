import { Router } from "express";
import { journalData } from "../data/index.js";

const router = Router();

router.post('/journal', async (req, res) => {
    const { userId, message, date } = req.body;
    try {
      if (!userId || typeof userId !== 'string') {
        throw new Error('Invalid user ID');
      }
  
      if (!message || typeof message !== 'string') {
        throw new Error('Invalid message');
      }
  
      if (typeof date !== 'object' || isNaN(date.getTime())) { 
        throw new Error('Invalid Date');
      }
  
      const result = await journalData.CreateJournal(userId, message, date);
      if (result) {
        res.status(200).json(result);
      } else {
        throw new Error('Journal cannot be created');
      }
    } catch (e) {
      console.log(e);
      res.status(400).json({ error: e.message });
    }
  });
  
  router.get('/journal/:id', async (req, res) => {
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) {
        throw new Error('Invalid id');
      }
      const journal = await journalData.getJournal(id);
      if (!journal) {
        throw new Error('No journal with that id');
      }
      res.json({ journal });
    } catch (error) {
      if (error.message === 'Invalid id') {
        res.status(400).json({ error: 'Invalid id' });
      } else if (error.message === 'No journal with that id') {
        res.status(404).json({ error: 'No journal with that id' });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  });
  
  router.delete('/journal/:id', async (req,res) =>{
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
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

export default router;