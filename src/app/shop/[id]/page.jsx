"use client";
import { Button, Typography } from "@material-tailwind/react";
import ProductService from "../../../utils/Services/ProductService";
import { imgURL } from "../../../utils/Services/UserService";
import { useDispatch } from "react-redux";
import { add } from "@/utils/Redux/CartSlice";
import { toast } from "react-toastify";
import React, { useContext, useState, useEffect } from "react";
import AuthDialog from "@/components/Auth/AuthDialogue";
import { UserContext } from "@/utils/Context/UserContext";
import cartService from "@/utils/Services/CartService";
import { ReviewField } from "@/components/DashboardComponents/Reviews/ReviewField";
import { CustomerReviews } from "@/components/DashboardComponents/Reviews/CustomerReviews";

const page = ({ params }) => {
  const [product, setSelectedProduct] = useState("");
  useEffect(() => {
    const getProductById = () => {
      ProductService.getProductById(params.id)
        .then((res) => {
          const product = res.data.data;
          setSelectedProduct(product);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getProductById();
  }, [params.id]);

  const { user, loading } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleCart = async (product) => {
    if (user) {
      const productId = product._id;
      const quantity = 1;
      const token = localStorage.getItem("token");
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
  const boughtByUserIds = Array.isArray(product.boughtBy) ? product.boughtBy : [product.boughtBy];

  return (
    <>
      <div className=" py-8 pt-36">
        <AuthDialog open={open} handleClose={handleClose} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-xl  mb-4">
                <img
                  className="w-full h-full rounded-xl object-cover"
                  src={`${imgURL}/${product.image}`}
                  alt={product.name}
                />
              </div>
              <div className="flex -mx-2 mb-4">
                <div className="w-1/2 px-2">
                  <Button
                    onClick={() => handleCart(product)}
                    className="w-full bg-amber-900 text-white py-2 px-4 rounded-full font-bold hover:bg-amber-800"
                  >
                    Add to Cart
                  </Button>
                </div>
                <div className="w-1/2 px-2">
                  <Button className="w-full bg-gray-400 text-gray-800 py-2 px-4 rounded-full font-bold hover:bg-gray-300">
                    Add to Wishlist
                  </Button>
                </div>
              </div>
              <div className=" my-10 flex flex-col gap-4  ">
                <Typography variant="h5" color="blue-gray">
                  Customer Reviews
                </Typography>
                <ReviewField productId={product._id}  boughtByUserIds={boughtByUserIds}/>
                <CustomerReviews productId={product._id}  />
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <Typography variant="h3" className="mb-2">
                {product.name}
              </Typography>
              <Typography className="text-gray-600 text-lg mb-4">
                {product.description}
              </Typography>
              <div className="flex mb-8">
                <Typography className="mr-4">
                  <span className="font-bold text-gray-700">Price:</span>
                  <span className="text-gray-600"> Rs. {product.price}</span>
                </Typography>
                <Typography>
                  <span className="font-bold text-gray-700">Availability:</span>
                  <span className="text-gray-600">In Stock</span>
                </Typography>
              </div>
              <div className="mb-8">
                <Typography className="font-bold text-gray-700">
                  Select Color:
                </Typography>
                <div className="flex items-center mt-2">
                  <Button className="w-6 h-6 rounded-full bg-gray-800 mr-2" />
                  <Button className="w-6 h-6 rounded-full bg-red-500 mr-2" />
                  <Button className="w-6 h-6 rounded-full bg-blue-500 mr-2" />
                  <Button className="w-6 h-6 rounded-full bg-yellow-500 mr-2" />
                </div>
              </div>
              <div className="mb-8">
                <Typography className="font-bold text-gray-700">
                  Select Size:
                </Typography>
                <div className="flex items-center mt-2">
                  <Button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">
                    S
                  </Button>
                  <Button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">
                    M
                  </Button>
                  <Button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">
                    L
                  </Button>
                  <Button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">
                    XL
                  </Button>
                  <Button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400">
                    XXL
                  </Button>
                </div>
              </div>

              <div>
                <Typography className="font-bold text-gray-700">
                  Product Description:
                </Typography>
                <Typography className="text-gray-600 text-lg mt-2">
                  {product.description}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
