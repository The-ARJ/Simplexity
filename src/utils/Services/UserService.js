import axios from "axios";
const baseURL = "http://localhost:3005/users";
// export const imgURL = "http://localhost:3005";
export const imgURL = "https://res.cloudinary.com/dy8ua6x3r/image/upload/";
const login = (credentials) => {
    return axios.post(`${baseURL}/login/user`, credentials);
};

const register = (userDetails) => {
    return axios.post(`${baseURL}/`, userDetails);
};

const updateUser = (userId, updatedUserDetails, token) => {
    const config = {
        headers: {
            Authorization: `bearer ${token}`,

        },
    };
    return axios.put(`${baseURL}/${userId}`, updatedUserDetails, config);
};
const updatePassword = (userId, oldPassword, password, token) => {
    const config = {
        headers: {
            Authorization: `bearer ${token}`,
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
const getAllUsers = (token) => {
    return axios.get(`${baseURL}`, {
        headers: {
            Authorization: `bearer ${token}`,
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

const VerifyCode = (credentials) => {
    return axios.post(`${baseURL}/verify-code`, credentials);
};
const VerifyEmail = (credentials) => {
    return axios.post(`${baseURL}/verify-email`, credentials);
};
const ResetPassword = (credentials) => {
    return axios.post(`${baseURL}/reset-password"`, credentials);
};
const auth = {
    login,
    register,
    getCurrentUser,
    updateUser,
    logout,
    getAllUsers,
    updatePassword,
    VerifyCode,
    VerifyEmail,
    ResetPassword

};

export default auth;
