import { axiosApi } from "./api-interceptor";

const getFeeds = async () => {
  try {
    const response = await axiosApi.get(`/feeds/feed`);

    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    return [];
  }
};

const handleLike = async (likeData) => {
  try {
    const response = await axiosApi.put(`/feeds/feed/like`, likeData);
    return response;
  } catch (e) {
    return e;
  }
};
const handleUnLike = async (unlikeData) => {
  try {
    const response = await axiosApi.put(`/feeds/feed/unlike`, unlikeData);
    return response;
  } catch (e) {
    return e;
  }
};
const handleComment = async (commentData) => {
  try {
    const response = await axiosApi.put(`/feeds/feed/comment`, commentData);
    return response;
  } catch (e) {
    return e;
  }
};
const handleSavePost = async (savePostData) => {
  try {
    const response = await axiosApi.put(`/feeds/feed/comment`, savePostData);
    return response;
  } catch (e) {
    return e;
  }
};

export { getFeeds, handleLike, handleUnLike, handleComment, handleSavePost };
