import { Router } from "express";
import { feedBackData } from "../data/index.js";
import validation from "../validations.js";
const router = Router();

router.route("/").post(async (req, res) => {
  let feedBackInfo = req.body;
  if (!feedBackInfo || Object.keys(feedBackInfo).length === 0) {
    return res
      .status(400)
      .json({ error: "There are no fields in the request body" });
  }

  try {
    const newFD = await feedBackData.createFeedBack(
      feedBackInfo.userId,
      feedBackInfo.chatId,
      feedBackInfo.isPublic,
      feedBackInfo.rate1,
      feedBackInfo.rate2,
      feedBackInfo.rate3,
      feedBackInfo.description
    );
    res.json(newFD);
  } catch (e) {
    let status = e[0] ? e[0] : 500;
    let message = e[1] ? e[1] : "Internal Server Error";
    res.status(status).send({ errors: message });
  }
});

router.route("/user").post(async (req, res) => {
  let feedBackInfo = req.body;
  if (!feedBackInfo || Object.keys(feedBackInfo).length === 0) {
    return res
      .status(400)
      .json({ error: "There are no fields in the request body" });
  }

  try {
    let feedBackList = await feedBackData.getByuserId(feedBackInfo.userId);
    res.json(feedBackList);
  } catch (e) {
    let status = e[0] ? e[0] : 500;
    let message = e[1] ? e[1] : "Internal Server Error";
    res.status(status).send({ error: message });
  }
});

router
  .route("/feedback")
  .post(async (req, res) => {
    let feedBackInfo = req.body;
    if (!feedBackInfo || Object.keys(feedBackInfo).length === 0) {
      return res
        .status(400)
        .json({ error: "There are no fields in the request body" });
    }

    try {
      let feedBack = await feedBackData.getByFeedId(feedBackInfo.feedBackId);
      res.json(feedBack);
    } catch (e) {
      let status = e[0] ? e[0] : 500;
      let message = e[1] ? e[1] : "Internal Server Error";
      res.status(status).send({ error: message });
    }
  })
  .put(async (req, res) => {
    let feedBackInfo = req.body;
    if (!feedBackInfo || Object.keys(feedBackInfo).length === 0) {
      return res
        .status(400)
        .json({ error: "There are no fields in the request body" });
    }
    try {
      const newFD = await feedBackData.update(
        feedBackInfo.feedBackId,
        feedBackInfo.isPublic,
        feedBackInfo.rate1,
        feedBackInfo.rate2,
        feedBackInfo.rate3,
        feedBackInfo.description
      );
      //console.log(newFD);
      res.json(newFD);
    } catch (e) {
      let status = e[0] ? e[0] : 500;
      let message = e[1] ? e[1] : "Internal Server Error";
      res.status(status).send({ errors: message });
    }
  })
  .delete(async (req, res) => {
    let feedBackInfo = req.body;
    if (!feedBackInfo || Object.keys(feedBackInfo).length === 0) {
      return res
        .status(400)
        .json({ error: "There are no fields in the request body" });
    }
    try {
      let deleteFeedBack = await feedBackData.remove(feedBackInfo.feedBackId);
      res.json(deleteFeedBack);
    } catch (e) {
      console.log(e);
      let status = e[0] ? e[0] : 500;
      let message = e[1] ? e[1] : "Internal Server Error";
      res.status(status).send({ error: message });
    }
  });

router.route("/chatId").post(async (req, res) => {
  let feedBackInfo = req.body;
  if (!feedBackInfo || Object.keys(feedBackInfo).length === 0) {
    return res
      .status(400)
      .json({ error: "There are no fields in the request body" });
  }

  try {
    let feedBack = await feedBackData.getByChatId(feedBackInfo.chatId);
    res.json(feedBack);
  } catch (e) {
    let status = e[0] ? e[0] : 500;
    let message = e[1] ? e[1] : "Internal Server Error";
    res.status(status).send({ error: message });
  }
});
export default router;
