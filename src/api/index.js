import { axiosApi } from "./api-interceptor";

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
    const response = await axiosApi.post('/user/signup', user)

    return constructResponse(response.status, response.data)
  } catch (e) {
    return constructResponse(e.response.status, e.response.data)
  }
}

const loginUser = async (loginData) => {
  try {
    const response = await axiosApi.post('/user/login', loginData);
    return response
  } catch(error) {
    return error;
  };
};

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
    const response = await axiosApi.get(`/user/user`)
    if (response.status === 200) {
      return response.data
    }
    return {}
  }catch (e){
    console.log(e)
    return {}
  }
}

const editProfile = async (user) => {
  try{
    const response = await axiosApi.put('/user/update', user)

    return constructResponse(response.status, response.data)
  } catch (e) {
    return constructResponse(e.response.status, e.response.data)
  }
}

const deleteProfile = async ({ permanent, isActive }) => {
  try {
    const response = await axiosApi.put(`/user/delete`, { permanent, isActive })

    if (response.status === 200){
      return true
    }
    return false
  } catch(e){
    return false
  }
}

const getBlockedUsers = async() =>{
  try {
    const response  = await axiosApi.get('/user/blocked/users')
    if (response.status === 200) {
      return response.data
    }
  } catch (e) {
    return []
  }
}

const unblockProfile = async (unblockConnectionId) => {
  try {
      const response = await axiosApi.put('/chat/unblock', { unblockConnectionId })
      if (response.status === 200){
        return true
      }
      return false
  } catch(e){
    if (e.data.status === 400 || e.data.status === 404) {
      return true
    } else {
      return false
    }
  }
}
export { checkLoggedInOnBackend, loginUser, createUserAccountAxios ,getUserById, editProfile, deleteProfile, getBlockedUsers, unblockProfile,getLoggedInUser};
