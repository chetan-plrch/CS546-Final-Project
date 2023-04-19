import { Router } from "express";
import { feedBackData } from "../data/index.js";
import validation from "../validations.js";
const router = Router();

// router
//   .route("/")
//   .get(async (req, res) => {
//     try {
//       let feedBackList = await feedBackData.getAll();
//       res.json(feedBackList);
//     } catch (e) {
//       let status = e[0] ? e[0] : 500;
//       let message = e[1] ? e[1] : "Internal Server Error";
//       res.status(status).send({ error: message });
//     }
//   })
//   .post(async (req, res) => {
//     let feedBackInfo = req.body;
//     if (!feedBackInfo || Object.keys(feedBackInfo).length === 0) {
//       return res
//         .status(400)
//         .json({ error: "There are no fields in the request body" });
//     }

//     try {
//       const newFD = await feedBackData.createFeedBack(
//         feedBackInfo.userID,
//         feedBackInfo.chatId,
//         feedBackInfo.isPublic,
//         feedBackInfo.rate1,
//         feedBackInfo.rate2,
//         feedBackInfo.rate3,
//         feedBackInfo.description
//       );
//       res.json(newFD);
//     } catch (e) {
//       let status = e[0] ? e[0] : 500;
//       let message = e[1] ? e[1] : "Internal Server Error";
//       res.status(status).send({ errors: message });
//     }
//   });

router
  .route("/:userID")
  .get(async (req, res) => {
    try {
      let userID = req.params.userID;
      userID = validation.checkId(userID);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      let feedBackList = await feedBackData.getByUserId(userID);
      res.json(feedBackList);
    } catch (e) {
      let status = e[0] ? e[0] : 500;
      let message = e[1] ? e[1] : "Internal Server Error";
      res.status(status).send({ error: message });
    }
  })
  .post(async (req, res) => {
    try {
      let userID = req.params.userID;
      userID = validation.checkId(userID);
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    let feedBackInfo = req.body;
    if (!feedBackInfo || Object.keys(feedBackInfo).length === 0) {
      return res
        .status(400)
        .json({ error: "There are no fields in the request body" });
    }

    try {
      const newFD = await feedBackData.createFeedBack(
        req.params.userID,
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
  })
  .delete(async(req,res)=>{

  })

router
  .route("/feedback/:feedbackID")
  .get(async(req,res)=>{

  })
  .put(async(req,res)=>{
    
  })
  .delete(async(req,res)=>{

  })
export default router;
