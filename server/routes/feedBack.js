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

  //validation for the request body
  let errors = [];
  try {
    feedBackInfo.userId = validation.checkId(feedBackInfo.userId, "user Id");
  } catch (e) {
    errors.push(e);
  }

  try {
    feedBackInfo.chatId = validation.checkId(feedBackInfo.chatId, "chat Id");
  } catch (e) {
    errors.push(e);
  }

  try {
    feedBackInfo.isPublic = validation.checkBoolean(feedBackInfo.isPublic, 'isPublic');
  } catch (e) {
    errors.push(e);
  }

  try {
    feedBackInfo.rate1 = validation.checkRating(
      feedBackInfo.rate1,
      "reconnect_probability"
    );
  } catch (e) {
    errors.push(e);
  }
  try {
    feedBackInfo.rate2 = validation.checkRating(
      feedBackInfo.rate2,
      "satisfied_with_chat"
    );
  } catch (e) {
    errors.push(e);
  }
  try {
    feedBackInfo.rate3 = validation.checkRating(
      feedBackInfo.rate3,
      "listener_rating"
    );
  } catch (e) {
    errors.push(e);
  }

  if(feedBackInfo.description){
    try {
      feedBackInfo.description = validation.checkString(
        feedBackInfo.description,
        "feedback description"
      );
    } catch (e) {
      errors.push(e);
    }
  }
  
  if (errors.length > 0) {
    return res.status(400).send(errors);
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
    return res.json(newFD);
  } catch (e) {
    let status = e[0] ? e[0] : 500;
    let message = e[1] ? e[1] : "Internal Server Error";
    return res.status(status).send({ errors: message });
  }
});

router.route("/user").post(async (req, res) => {
  let feedBackInfo = req.body;
  if (!feedBackInfo || Object.keys(feedBackInfo).length === 0) {
    return res
      .status(400)
      .json({ error: "There are no fields in the request body" });
  }

  //validation for the request body
  let errors = [];
  try {
    feedBackInfo.userId = validation.checkId(feedBackInfo.userId, "user Id");
  } catch (e) {
    errors.push(e);
  }
  if (errors.length > 0) {
    return res.status(400).send(errors);
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

    //validation for the request body
    let errors = [];
    try {
      feedBackInfo.feedBackId = validation.checkId(
        feedBackInfo.feedBackId,
        "feedback Id"
      );
    } catch (e) {
      errors.push(e);
    }
    if (errors.length > 0) {
      return res.status(400).send(errors);
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
    
    let errors = [];
    try {
      feedBackInfo.feedBackId = validation.checkId(feedBackInfo.feedBackId, "feedback Id");
    } catch (e) {
      errors.push(e);
    }

    try {
      feedBackInfo.isPublic = validation.checkBoolean(feedBackInfo.isPublic, 'isPublic');
    } catch (e) {
      errors.push(e);
    }
  
    try {
      feedBackInfo.rate1 = validation.checkRating(
        feedBackInfo.rate1,
        "reconnect_probability"
      );
    } catch (e) {
      errors.push(e);
    }
    try {
      feedBackInfo.rate2 = validation.checkRating(
        feedBackInfo.rate2,
        "satisfied_with_chat"
      );
    } catch (e) {
      errors.push(e);
    }
    try {
      feedBackInfo.rate3 = validation.checkRating(
        feedBackInfo.rate3,
        "listener_rating"
      );
    } catch (e) {
      errors.push(e);
    }
    if(feedBackInfo.description){
      try {
        feedBackInfo.description = validation.checkString(
          feedBackInfo.description,
          "feedback description"
        );
      } catch (e) {
        errors.push(e);
      }
    }
    if (errors.length > 0) {
      return res.status(400).send(errors);
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

    //validation for the request body
    let errors = [];
    try {
      feedBackInfo.feedBackId = validation.checkId(feedBackInfo.feedBackId, "feedback Id");
    } catch (e) {
      errors.push(e);
    }
    if (errors.length > 0) {
      return res.status(400).send(errors);
    }

    try {
      let deleteFeedBack = await feedBackData.remove(feedBackInfo.feedBackId);
      return res.json(deleteFeedBack);
    } catch (e) {
      let status = e[0] ? e[0] : 500;
      let message = e[1] ? e[1] : "Internal Server Error";
      return res.status(status).send({ error: message });
    }
  });

router.route("/chatId").post(async (req, res) => {
  let feedBackInfo = req.body;
  if (!feedBackInfo || Object.keys(feedBackInfo).length === 0) {
    return res
      .status(400)
      .json({ error: "There are no fields in the request body" });
  }

  //validation for the request body
  let errors = [];
  try {
    feedBackInfo.chatId = validation.checkId(feedBackInfo.chatId, "chat Id");
  } catch (e) {
    errors.push(e);
  }
  if (errors.length > 0) {
    return res.status(400).send(errors);
  }

  try {
    let feedBack = await feedBackData.getByChatId(feedBackInfo.chatId, feedBackInfo.userId);
    res.json(feedBack);
  } catch (e) {
    let status = e[0] ? e[0] : 500;
    let message = e[1] ? e[1] : "Internal Server Error";
    res.status(status).send({ error: message });
  }
});

router.route("/getall").post(async(req,res)=>{
  let feedBackInfo = req.body;
  if (!feedBackInfo || Object.keys(feedBackInfo).length === 0) {
    return res
      .status(400)
      .json({ error: "There are no fields in the request body" });
  }

  try {
    let feedBack = await feedBackData.getAll(feedBackInfo.isView);
    res.json(feedBack);
  } catch (e) {
    let status = e[0] ? e[0] : 500;
    let message = e[1] ? e[1] : "Internal Server Error";
    res.status(status).send({ error: message });
  }

})
export default router;
