import axios from "axios";
export const CartURL = "https://simplexity-backend-gadgqjtug-the-arj.vercel.app/carts";

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
const buyFromCart = (token) => {
    return axios.post(
        `${CartURL}/product/buy`,
        {},
        {
            headers: {
                Authorization: `bearer ${token}`,
            },
        }
    );
};
const cartService = {
    getCart,
    addToCart,
    updateCartProduct,
    removeFromCart,
    buyFromCart
};

export default cartService;
