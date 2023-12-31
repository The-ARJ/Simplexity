import axios from "axios";
export const ReviewURL = "https://simplexity-backend-gadgqjtug-the-arj.vercel.app/reviews";

const getAllReviews = (token) => {
  return axios.get(`${ReviewURL}`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
};

const getReviewById = (id) => {
  return axios.get(`${ReviewURL}/${id}`);
};

const deleteReviewbyId = (id, token) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };
  return axios.delete(`${ReviewURL}/${id}`, config);
};

const createReview = (reviewData, token) => {
  const config = {
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  return axios.post(`${ReviewURL}/`, reviewData, config);
};

const updateReview = (ReviewId, updatedReviewDetails, token) => {
  return axios.put(`${ReviewURL}/${ReviewId}`, updatedReviewDetails, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
};

// New function to get reviews by a specific product ID
const getReviewsByProduct = (productId) => {
  return axios.get(`${ReviewURL}/product/${productId}`);
};

const reviewService = {
  getAllReviews,
  createReview,
  deleteReviewbyId,
  updateReview,
  getReviewById,
  getReviewsByProduct, // Add the new function to the service
};

export default reviewService;
