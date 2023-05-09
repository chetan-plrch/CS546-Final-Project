import { Router } from "express";
import { feedData } from "../data/index.js";
import validations from "../validations.js";

const router = Router();

router.route('/feed/:id').get(async (req, res) => {
  try {
    const feed = await feedData.getFeedById(req.params.id);

    res.status(200).json(feed);
  } catch (error) {
    if (error?.message?.includes?.('not found')) {
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
        return res.status(404).json({ error: "No feeds found" });
      }

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
    let errors = []
    try{
      feedInfo.userId = validations.checkId(feedInfo.userId,"user Id")
    }catch(e){
      errors.push(e)
    }
    try{
      feedInfo.feedId = validations.checkId(feedInfo.feedId,"feed Id")
    }catch(e){
      errors.push(e)
    }
    try{
      feedInfo.isLike = validations.checkBoolean(feedInfo.isLike,"isLike")
    }catch(e){
      errors.push(e)
    }

    if (errors.length > 0) {
      return res.status(400).send(errors);
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
    let errors = []
    try{
      feedInfo.userId = validations.checkId(feedInfo.userId,"user Id")
    }catch(e){
      errors.push(e)
    }
    try{
      feedInfo.feedId = validations.checkId(feedInfo.feedId,"feed Id")
    }catch(e){
      errors.push(e)
    }
    try{
      feedInfo.isUnLike = validations.checkBoolean(feedInfo.isUnLike,"isUnLike")
    }catch(e){
      errors.push(e)
    }

    if (errors.length > 0) {
      return res.status(400).send(errors);
    }
    try{
      const feed = await feedData.updateUnLike(feedInfo.userId,feedInfo.feedId,feedInfo.isUnLike);
      return res.json(feed)
    }catch(e){
      return res.json(feed)
    }
})

router
.route("/feed/comment")
.put(async(req,res)=>{
  let feedInfo = req.body || {};
  if (!feedInfo || Object.keys(feedInfo).length === 0) {
    return res
      .status(400)
      .json({ error: "There are no fields in the request body" });
  }
  let errors = []
    try{
      feedInfo.userId = validations.checkId(feedInfo.userId,"user Id")
    }catch(e){
      errors.push(e)
    }
    try{
      feedInfo.feedId = validations.checkId(feedInfo.feedId,"feed Id")
    }catch(e){
      errors.push(e)
    }
    try{
      feedInfo.message = validations.checkString(feedInfo.message,"Comment message")
    }catch(e){
      errors.push(e)
    }
    try {
      // full name of user commenting
      feedInfo.userName = validation.validateName(feedInfo.userName, "User Name");
    } catch(e) {
      errors.push(e);
    };
    if (errors.length > 0) {
      return res.status(400).send(errors);
    }
  try{
    const feed = await feedData.updateComment(feedInfo);
    return res.json(feed)
  }catch(e){
    return res.json(feed)
  }
})

router
.route("/feed/savepost")
.put(async(req,res)=>{
  let feedInfo = req.body;
  if (!feedInfo || Object.keys(feedInfo).length === 0) {
    return res
      .status(400)
      .json({ error: "There are no fields in the request body" });
  }
  let errors = []
    try{
      feedInfo.userId = validations.checkId(feedInfo.userId,"user Id")
    }catch(e){
      errors.push(e)
    }
    try{
      feedInfo.feedId = validations.checkId(feedInfo.feedId,"feed Id")
    }catch(e){
      errors.push(e)
    }
    try{
      feedInfo.isSave = validations.checkBoolean(feedInfo.isSave,"isSave")
    }catch(e){
      errors.push(e)
    }

    if (errors.length > 0) {
      return res.status(400).send(errors);
    }
  try{
    const feed = await feedData.savePost(feedInfo.userId,feedInfo.feedId,feedInfo.isSave);
    return res.json(feed)
  }catch(e){
    return res.json(feed)
  }
})

export default router;
