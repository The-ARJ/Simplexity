
import axios from "axios";
export const ProductURL = "https://simplexity-backend-gadgqjtug-the-arj.vercel.app/products";

const getAllProducts = (data) => {
    return axios.get(`${ProductURL}`, data);
};

const getProductById = (id,) => {
    return axios.get(`${ProductURL}/${id}`);
};
const getProductBySlug = (slug,) => {
    return axios.get(`${ProductURL}/slug/${slug}`);
};

const deleteProductbyId = (id, token) => {
    const config = {
        headers: {
            Authorization: `bearer ${token}`,
        },
    };
    return axios.delete(`${ProductURL}/${id}`, config);
};

const createProduct = (formData, token) => {
    const config = {
        headers: {
            Authorization: `bearer ${token}`,
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
    getProductById,
    getProductBySlug
};

export default auth;