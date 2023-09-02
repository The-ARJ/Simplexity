"use client"
import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import showToast from "./Cart/Toast";
import cartService from "@/utils/Services/CartService";
import AuthDialog from "./Auth/AuthDialogue";
import { useDispatch, useSelector } from "react-redux";
import { add } from "@/utils/Redux/CartSlice";

const AddToCart = ({ product }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleCart = async (product) => {
    if (user) {
      const productId = product._id;
      const quantity = 1;
      const token = user.token;
      await cartService.addToCart(productId, quantity, token);
      dispatch(add({ product, quantity }));
      showToast("Item added to cart", "success");
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        onClick={() => handleCart(product)}
        ripple={false}
        fullWidth={true}
        className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100"
      >
        Add to Cart
      </Button>
      <AuthDialog open={open} handleClose={handleClose} />
    </>
  );
};

export default AddToCart;
