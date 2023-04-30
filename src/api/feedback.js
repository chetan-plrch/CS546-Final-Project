import axios from "axios";
import { axiosApi } from "./api-interceptor";

const createFeedBack = async (feedbackData) => {
  try {
    const response = await axiosApi.post("/feedbacks/", feedbackData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

const feedBackList = async (userId) => {
  try {
    const response = await axiosApi.post("/feedbacks/user", {
      userId: userId,
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

const feedbackEdit = async (updatedFeedback) => {
  try {
    const response = await axiosApi.put("/feedbacks/feedback", updatedFeedback, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

const feedbackDelete = async (feedId) => {
  try {
    const response = await axiosApi.post("/feedbacks/feedback", {
      feedBackId: feedId,
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

const getFeedback = async (feedId) => {
  try {
    const response = await axiosApi.post("/feedbacks/feedback", {
      feedBackId: feedId,
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

const getFeedbackByChatId = async (chatId) => {
  const response = await axiosApi.post("/feedbacks/chatId", { chatId });
  return response.data;
};

export {
  createFeedBack,
  feedBackList,
  feedbackDelete,
  feedbackEdit,
  getFeedback,
  getFeedbackByChatId,
};
