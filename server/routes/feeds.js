import { Router } from "express";
import { feedData } from "../data/index.js";

const router = Router();

router.route('/feed/:id').get(async (req, res) => {
  try {
    const feed = await feedData.getFeedById(req.params.id);

    res.status(200).json(feed);
  } catch (error) {
    if (error.message.includes('not found')) {
      res.status(404).json({ error: error.message });
    } else {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});


router.route('/feed').get(async (req, res) => {
    try {
      const feeds = await feedData.getAll();
  
      if (!feeds) {
        return res.status(404).json({ error: 'No feeds found' });
      }
  
      const result = feeds.map((feed) => ({
        _id: feed._id.toString(),
        title: feed.title,
        description: feed.description,
        type: feed.type,
        images: feed.images,
      }));
  
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

export default router;