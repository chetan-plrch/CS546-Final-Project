import { getUserId } from "../helper";
import { axiosApi } from "./api-interceptor";
import Cookies from 'js-cookie';

const constructResponse = (status, responseJson) => {
  if (status === 200) {
    return [false, responseJson];
  } else if (status === 400) {
    return [true, formatErrorMessage(responseJson)]
  } else if (status === 404) {
    return [true, formatErrorMessage(responseJson)]
  } else {
    return [true, formatErrorMessage(responseJson)]
  }
}

const formatErrorMessage = (errorResponse) => {
  if (Array.isArray(errorResponse.errors)) {
    return errorResponse.errors.slice(0, 2)
  } else {
    return [errorResponse.error]
  }
}

const createUserAccountAxios =  async (user) => {
  try {
    const response = await axiosApi.post('/user/signup', user, {
      headers: { "Content-Type": "application/json" }
    })

    return constructResponse(response.status, response.data)
  } catch (e) {
    return constructResponse(e.response.status, e.response.data)
  }
}

const loginUser = async (loginData) => {
  try {
    const response = await axiosApi.post('/user/login', loginData, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    return response
  }catch(e){
    return constructResponse(e.response.status, e.response.data)
  }
  
}

const checkLoggedInOnBackend = async () => {
  try {
    const response = await axiosApi.get('/user/is-loggedin')

    if (response.status === 200) {
      return true
    }
    return false
  } catch (e) {
    return false
  }
}

const getLoggedInUser = async () => {
  try {
    const { data } = await axiosApi.get('/user/user')
    const { profilePic } = data
    return profilePic
  } catch (e) {
    return null
  }
}

const getUserById = async() => {
  try{
    const userId = getUserId()
    console.log(`inside the useeffect api call ${userId}`);
    const response  = await axiosApi.get(`/user/user`)
    if (response.status === 200){
      return response
    }
  }catch (e){
    console.log(e)
    return e
  }
}

const getFeeds = async() => {
  try{
  
    const response  = await axiosApi.get(`/feeds/feed`)

    if (response.status === 200){
      return response.data
    }
  }catch (e){
    return []
  }
}

  const editProfile = async() => {
  const userId = getUserId()
  try{
    const response = await axiosApi.put(`/user/${userId}`)

    if (response.status === 200){
      return response.data
    }
  } catch(e){
    return e
  }
}

const deleteProfile = async() => {
  const userId = getUserId()
  try{
    const response = await axiosApi.put(`/user/delete/${userId}`)

    if (response.status === 200){
      return response.data
    }
  } catch(e){
    return e
  }
}

const getBlockedUsers = async() =>{
  try{
    const userId = getUserId()
    console.log(`blocked user api ${userId}`);
    const response  = await axiosApi.get(`user/user/blocked/${userId}`)
    if (response.status === 200){
      return response
    }
  }catch (e){
    console.log(e)
    return e
  }
}

const UnblockProfile = async() =>{
  try{
      const userId = getUserId()
      console.log(`unblocked user api ${userId}`);
      const response = await axiosApi.put('chat/unblock')
      if(response.status === 200){
        return response
      }
  }catch(e){
    console.log(e)
    return e
  }
}
export { checkLoggedInOnBackend, loginUser, createUserAccountAxios ,getUserById, getFeeds, editProfile, deleteProfile, getBlockedUsers, UnblockProfile,getLoggedInUser};
