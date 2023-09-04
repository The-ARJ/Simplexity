import axios from "axios";

const getProducts = async ({ page, limit, query, sortBy }) => {
  const response = await axios.get("http://localhost:3005/products", {
    params: { page, limit, query, sortBy },
  });

  return response.data;
};

export default getProducts;
