import { Router } from "express";
import { feedData } from "../data/index.js";

const router = Router();

router
  .route("/feed")
  .get(async (req, res) => {
    try {
      const feeds = await feedData.getAll();

      if (!feeds) {
        return res.status(404).json({ error: "No feeds found" });
      }

      // const result = feeds.map((feed) => ({
      //   _id: feed._id.toString(),
      //   title: feed.title,
      //   description: feed.description,
      //   type: feed.type,
      //   images: feed.images,
      // }));

      res.status(200).json(feeds);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: "Internal server error" });
    }
  })

router
.route("/feed/like")
  .put(async (req, res) => {
    let feedInfo = req.body;
    if (!feedInfo || Object.keys(feedInfo).length === 0) {
      return res
        .status(400)
        .json({ error: "There are no fields in the request body" });
    }
    try{
      const feed = await feedData.updateLike(feedInfo.userId,feedInfo.feedId,feedInfo.isLike);
      return res.json(feed)
    }catch(e){
      return res.json(feed)
    }
  });

router
.route("/feed/unlike")
.put(async(req,res)=>{
  let feedInfo = req.body;
    if (!feedInfo || Object.keys(feedInfo).length === 0) {
      return res
        .status(400)
        .json({ error: "There are no fields in the request body" });
    }
    try{
      const feed = await feedData.updateUnLike(feedInfo.userId,feedInfo.feedId,feedInfo.isUnLike);
      return res.json(feed)
    }catch(e){
      return res.json(feed)
    }
})

router
.route("/feed/commment")
.put(async(req,res)=>{
  let feedInfo = req.body;
  if (!feedInfo || Object.keys(feedInfo).length === 0) {
    return res
      .status(400)
      .json({ error: "There are no fields in the request body" });
  }
  

})

export default router;
