import { axiosApi } from "./api-interceptor";

// Gets all active connections for logged in user
const getAllUsers = async (params) => {
    try {
        const response = await axiosApi.get(`/user/all-users`, {params});
        return response;
    } catch (e) {
        console.log("error occurred", e);
    };
};

export { getAllUsers};
