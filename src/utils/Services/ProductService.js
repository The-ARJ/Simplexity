
import axios from "axios";
export const ProductURL = "http://localhost:3005/products";

const getAllProducts = () => {
    return axios.get(`${ProductURL}`);
};

const getProductById = (id,) => {
    return axios.get(`${ProductURL}/${id}`);
};

const deleteProductbyId = (id, token) => {
    const config = {
        headers: {
            Authorization: `bearer ${token}`,
        },
    };
    return axios.delete(`${ProductURL}/${id}`, config);
};

const createProduct = (formData) => {
    const config = {
        headers: {
            Authorization: `bearer ${window.localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
        },
    };
    return axios.post(`${ProductURL}/`, formData, config);
};

const updateProduct = (ProductId, updatedProductDetails, token) => {
    return axios.put(`${ProductURL}/${ProductId}`, updatedProductDetails, {
        headers: {
            Authorization: `bearer ${token}`,
        },
    });
};

const auth = {
    getAllProducts,
    createProduct,
    deleteProductbyId,
    updateProduct,
    getProductById
};

export default auth;