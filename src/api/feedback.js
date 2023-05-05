import axios from "axios";
import { axiosApi } from "./api-interceptor.js";

const createFeedBack = async (feedbackData) => {
  try {
    const response = await axiosApi.post("/feedbacks/", feedbackData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (e) {
    return e;
  }
};

const feedBackList = async (userId) => {
  try {
    const response = await axiosApi.post("/feedbacks/user", {
      userId: userId,
    });
    return response;
  } catch (e) {
    return e;
  }
};

const feedbackEdit = async (updatedFeedback) => {
  try {
    const response = await axiosApi.put(
      "/feedbacks/feedback",
      updatedFeedback,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (e) {
    return e;
  }
};

const feedbackDelete = async (feedId) => {
  try {
    const response = await axiosApi.delete("/feedbacks/feedback", {
      data: { feedBackId: feedId },
    });
    console.log(response);
    return response;
  } catch (e) {
    return e;
  }
};

const getFeedback = async (feedId) => {
  try {
    const response = await axiosApi.post("/feedbacks/feedback", {
      feedBackId: feedId,
    });
    return response;
  } catch (e) {
    return e;
  }
};

const getFeedbackByChatId = async (chatId, userId) => {
  const response = await axiosApi.post("/feedbacks/chatId", { chatId , userId});
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
