import axios from "axios";
import ProductService from "../utils/Services/ProductService";
const getProducts = async ({ page, limit, query, sortBy }) => {
  const response = await ProductService.getAllProducts({
    params: { page, limit, query, sortBy },
  });

  return response.data;
};

export default getProducts;
