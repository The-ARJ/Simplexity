import ProductService from "../utils/Services/ProductService";
const getProduct = async ({ params }) => {
  const response = await ProductService.getProductBySlug(params.slug);
  return response.data.data;
};

export default getProduct;
