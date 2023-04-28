import axios from "axios";

const createFeedBack = async (feedbackData) => {
  try {
    const response = await fetch("/feedbacks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feedbackData),
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

const feedBackList = async (userId) => {
  try {
    const response = await axios.post("/feedbacks/user", {
      userId: userId,
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

const feedbackEdit = async (updatedFeedback) => {
  try {
    const response = await fetch("/feedbacks/feedback", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFeedback),
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

const feedbackDelete = async (feedId) => {
  try {
    const response = await fetch("/feedbacks/feedback", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ feedBackId: feedId }),
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

const getFeedback = async(feedId)=>{
  try {
    const response  = await fetch("/feedbacks/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ feedBackId: feedId }),
    });
    return response
  } catch (e) {
    console.log(e);
  }
}

const getFeedbackByChatId = async (chatId) => {
  try {
    const response = await axios.post("/feedbacks/chatId", { chatId });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { createFeedBack, feedBackList, feedbackDelete, feedbackEdit, getFeedback, getFeedbackByChatId };
