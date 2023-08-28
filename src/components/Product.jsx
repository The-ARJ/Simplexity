import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import { imgURL } from "../utils/Services/UserService";
import React, { useEffect, useState } from "react";
import AuthDialog from "./Auth/AuthDialogue";
import { useDispatch, useSelector } from "react-redux";
import { add } from "@/utils/Redux/CartSlice";
import { toast } from "react-toastify";
import cartService from "@/utils/Services/CartService";
import ProductService from "@/utils/Services/ProductService";
import Link from "next/link";
import Pagination from "./DashboardComponents/Pagination";
export default function Product({ searchQuery, topSelling }) {
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;
  const getProducts = () => {
    const limit = pageSize;
    const offset = (currentPage - 1) * pageSize;
    ProductService.getAllProducts(limit, offset).then((res) => {
      let allProducts = res.data.data;
      // Filter products based on the searchQuery (name contains the searchQuery)
      let filteredProducts = allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // If topSelling prop is true, sort the products based on the length of 'boughtBy' array and take the first 6
      if (topSelling) {
        filteredProducts = filteredProducts
          .sort((a, b) => b.boughtBy.length - a.boughtBy.length)
          .slice(0, 10);
      }

      setProducts(filteredProducts);
    });
  };

  useEffect(() => {
    getProducts();
  }, [currentPage, searchQuery]);

  // Get the products for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentProducts = products.slice(startIndex, endIndex);

  const handleCart = async (product) => {
    if (user) {
      const productId = product._id;
      const quantity = 1;
      const token = user.token;
      await cartService.addToCart(productId, quantity, token);
      dispatch(add({ product, quantity }));
      toast.success("Item added to cart", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => setOpen(false);

  if (currentProducts.length === 0) {
    return (
      <Typography className=" text-center" color="blue-gray">
        No products available.
      </Typography>
    );
  }

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
        <AuthDialog open={open} handleClose={handleClose} />
        {currentProducts.map((product) => (
          <Card key={product._id} className="md:w-64 md:h-[450px]">
            <CardHeader
              shadow={false}
              floated={false}
              className=" h-56 md:h-64"
            >
              <Link href={`/shop/${product._id}`}>
                <img
                  src={`${imgURL}/${product.image}`}
                  className="w-full h-full object-cover"
                  alt={product.name}
                />
              </Link>
            </CardHeader>
            <CardBody className=" md:h-60">
              <div className="flex items-center justify-between mb-2">
                <Typography color="blue-gray" className="font-medium">
                  {product.name}
                </Typography>
                <Typography color="blue-gray" className="font-medium">
                  ${product.price}
                </Typography>
              </div>
              <Typography
                variant="small"
                color="gray"
                className="font-normal opacity-75"
              >
                {product.description}
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                onClick={() => handleCart(product)}
                ripple={false}
                fullWidth={true}
                className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100"
              >
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {!topSelling && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalProducts={products.length}
        />
      )}
    </div>
  );
}
