import { axiosApi } from "./api-interceptor";

const createFeedBack = async (feedbackData) => {
  try {
    const response = await axiosApi.post("/feedbacks/", feedbackData);
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
      updatedFeedback
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

const getAllFeedbacks = async(isView)=>{
  try{
    const response = await axiosApi.post("/feedbacks/getall",{isView});
    //console.log(response);
    return response;
  }catch(e){
    return e;
  }
};

const getFirstnames = async (chatId, userId) => {
  try {
    const chatInfo = await axiosApi.post("/chat/getByChatId", { chatId });
    const otherUserId = chatInfo.data[0].users.find(id => id !== userId);
    const userInfo = await axiosApi.get(`/user/${otherUserId}`);
    return userInfo.data.user.firstName;
  } catch (e) {
    return e;
  }
};


export {
  createFeedBack,
  feedBackList,
  feedbackDelete,
  feedbackEdit,
  getFeedback,
  getFeedbackByChatId,
  getAllFeedbacks,
  getFirstnames
};
