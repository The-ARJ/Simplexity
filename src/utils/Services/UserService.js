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
const updatePassword = (userId, oldPassword, password) => {
    const config = {
        headers: {
            Authorization: `bearer ${window.localStorage.getItem("token")}`,
        },
    };
    return axios.put(`${baseURL}/update-password/${userId}`, { oldPassword, password }, config);
};

const getCurrentUser = (token) => {
    const config = {
        headers: {
            Authorization: `bearer ${token}`,
        },
    };
    return axios.get(`${baseURL}/current/user`, config);
};
const getAllUsers = () => {
    return axios.get(`${baseURL}`, {
        headers: {
            Authorization: `bearer ${window.localStorage.getItem("token")}`,
        },
    });
};
const logout = (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return axios.post(`${baseURL}/current/user/logout`, {}, config);
};
const auth = {
    login,
    register,
    getCurrentUser,
    updateUser,
    logout,
    getAllUsers,
    updatePassword
};

export default auth;
