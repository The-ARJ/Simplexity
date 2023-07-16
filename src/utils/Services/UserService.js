import axios from "axios";

const baseURL = "http://localhost:3005/users";
export const imgURL = "http://localhost:3005";

const login = (credentials) => {
    return axios.post(`${baseURL}/login/user`, credentials);
};

const register = (userDetails) => {
    return axios.post(`${baseURL}/`, userDetails);
};

const updateUser = (userId, updatedUserDetails) => {
    const config = {
        headers: {
            Authorization: `bearer ${window.localStorage.getItem("token")}`,
        },
    };
    return axios.put(`${baseURL}/${userId}`, updatedUserDetails, config);
};
const getCurrentUser = (token) => {
    const config = {
        headers: {
            Authorization: `bearer ${token}`,
        },
    };
    return axios.get(`${baseURL}/current/user`, config);
};
const auth = {
    login,
    register,
    getCurrentUser,
    updateUser
};

export default auth;
