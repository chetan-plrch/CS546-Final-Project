import { Router } from "express";
import { feedBackData } from "../data/index.js";
import validation from "../validations.js";
const router = Router();
import { userData } from "../data/index.js"
import { errorType } from "../util.js";

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
    errors.push(e?.message);
  }

  try {
    feedBackInfo.chatId = validation.checkId(feedBackInfo.chatId, "chat Id");
  } catch (e) {
    errors.push(e?.message);
  }

  try {
    feedBackInfo.isPublic = validation.checkBoolean(feedBackInfo.isPublic, 'isPublic');
  } catch (e) {
    errors.push(e?.message);
  }

  try {
    feedBackInfo.rate1 = validation.checkRating(
      feedBackInfo.rate1,
      "reconnect_probability"
    );
  } catch (e) {
    errors.push(e?.message);
  }
  try {
    feedBackInfo.rate2 = validation.checkRating(
      feedBackInfo.rate2,
      "satisfied_with_chat"
    );
  } catch (e) {
    errors.push(e?.message);
  }
  try {
    feedBackInfo.rate3 = validation.checkRating(
      feedBackInfo.rate3,
      "listener_rating"
    );
  } catch (e) {
    errors.push(e?.message);
  }

  if(feedBackInfo.description){
    try {
      feedBackInfo.description = validation.checkString(
        feedBackInfo.description,
        "feedback description"
      );
    } catch (e) {
      errors.push(e?.message);
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
    console.log(e);
    if (e.type === errorType.BAD_INPUT) {
      return res.status(400).json([ e.message ]);
    }
    return res.status(500).json({ error: 'Error: Internal server error' });
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
    errors.push(e?.message);
  }
  if (errors.length > 0) {
    return res.status(400).send(errors);
  }

  try {
    let feedBackList = await feedBackData.getByuserId(feedBackInfo.userId);
    const promises = []
    for (let i = 0; i < feedBackList.length; i++) {
      const feedback = feedBackList[i];
      promises.push(feedBackData.getFirstnames(feedback.chatId, feedback.userId));
    }
    const firstNames = await Promise.all(promises);
    let i =0;
    feedBackList?.forEach(elem => {
      elem.firstName = firstNames[i]
      i=i+1
    });
    res.json(feedBackList);
  } catch (e) {
    if (e.type === errorType.BAD_INPUT) {
      return res.status(400).json([ e.message ]);
    }
    return res.status(500).json({ error: 'Error: Internal server error' });
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
      errors.push(e?.message);
    }
    if (errors.length > 0) {
      return res.status(400).send(errors);
    }

    try {
      let feedBack = await feedBackData.getByFeedId(feedBackInfo.feedBackId);
      res.json(feedBack);
    } catch (e) {
      if (e.type === errorType.BAD_INPUT) {
      return res.status(400).json([ e.message ]);
    }
    return res.status(500).json({ error: 'Error: Internal server error' });
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
      errors.push(e?.message);
    }

    try {
      feedBackInfo.isPublic = validation.checkBoolean(feedBackInfo.isPublic, 'isPublic');
    } catch (e) {
      errors.push(e?.message);
    }
  
    try {
      feedBackInfo.rate1 = validation.checkRating(
        feedBackInfo.rate1,
        "reconnect_probability"
      );
    } catch (e) {
      errors.push(e?.message);
    }
    try {
      feedBackInfo.rate2 = validation.checkRating(
        feedBackInfo.rate2,
        "satisfied_with_chat"
      );
    } catch (e) {
      errors.push(e?.message);
    }
    try {
      feedBackInfo.rate3 = validation.checkRating(
        feedBackInfo.rate3,
        "listener_rating"
      );
    } catch (e) {
      errors.push(e?.message);
    }
    if(feedBackInfo.description){
      try {
        feedBackInfo.description = validation.checkString(
          feedBackInfo.description,
          "feedback description"
        );
      } catch (e) {
        errors.push(e?.message);
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
      res.json(newFD);
    } catch (e) {
      if (e.type === errorType.BAD_INPUT) {
      return res.status(400).json([ e.message ]);
    }
    return res.status(500).json({ error: 'Error: Internal server error' });
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
      errors.push(e?.message);
    }
    if (errors.length > 0) {
      return res.status(400).send(errors);
    }

    try {
      let deleteFeedBack = await feedBackData.remove(feedBackInfo.feedBackId);
      return res.json(deleteFeedBack);
    } catch (e) {
      if (e.type === errorType.BAD_INPUT) {
      return res.status(400).json([ e.message ]);
    }
    return res.status(500).json({ error: 'Error: Internal server error' });
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
    errors.push(e?.message);
  }
  try {
    feedBackInfo.userId = validation.checkId(feedBackInfo.userId, "user Id");
  } catch (e) {
    errors.push(e?.message);
  }
  if (errors.length > 0) {
    return res.status(400).send(errors);
  }

  try {
    let feedBack = await feedBackData.getByChatId(feedBackInfo.chatId, feedBackInfo.userId);
    res.json(feedBack);
  } catch (e) {
    if (e.type === errorType.BAD_INPUT) {
      return res.status(400).json([ e.message ]);
    }
    return res.status(500).json({ error: 'Error: Internal server error' });
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
    let seekerFeedBack = await userData.filterSeekerFeedback(feedBack);

    const promises = []
    for (let i = 0; i < seekerFeedBack.length; i++) {
      const feedback = seekerFeedBack[i];
      promises.push(feedBackData.getFirstnames(feedback.chatId, feedback.userId));
    }
    const firstNames = await Promise.all(promises);
    let i =0;
    seekerFeedBack?.forEach(elem => {
      elem.firstName = firstNames[i]
      i=i+1
    });
    //console.log(firstNames);

    res.json(seekerFeedBack);
  } catch (e) {
    console.log(e);
    if (e.type === errorType.BAD_INPUT) {
      return res.status(400).json([ e.message ]);
    }
    return res.status(500).json({ error: 'Error: Internal server error' });
  }
})

export default router;
