import axios from "axios";
export const CartURL = "http://localhost:3005/carts";

const getCart = (token) => {
    return axios.get(`${CartURL}`, {
        headers: {
            Authorization: `bearer ${token}`,
        },
    });
};

const addToCart = (productId, quantity, token) => {
    return axios.post(`${CartURL}`, { productId, quantity }, {
        headers: {
            Authorization: `bearer ${token}`,
        },
    });
};

const updateCartProduct = (productId, quantity, token) => {
    return axios.put(`${CartURL}/${productId}`, { quantity }, {
        headers: {
            Authorization: `bearer ${token}`,
        },
    });
};

const removeFromCart = (productId, token) => {
    const config = {
        headers: {
            Authorization: `bearer ${token}`,
        },
    };
    return axios.delete(`${CartURL}/${productId}`, config);
};

const cartService = {
    getCart,
    addToCart,
    updateCartProduct,
    removeFromCart,
};

export default cartService;
