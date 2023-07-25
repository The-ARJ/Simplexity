"use client";
import React, { useContext, useEffect, useState } from "react";
import { Breadcrumbs } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import swal from "sweetalert2";
import ComplexNavbar from "@/components/Header/Header";
import Link from "next/link";
import cartService from "@/utils/Services/CartService";
import { UserContext } from "@/utils/Context/UserContext";
import { imgURL } from "../../utils/Services/UserService";
import showToast from "@/components/Cart/Toast";
import { remove, updateCart } from "@/utils/Redux/CartSlice";
import { usePathname, useRouter } from "next/navigation";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
const DeliveryDetailsForm = () => {
  const router = useRouter();
  const { user, loading } = useContext(UserContext);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart);

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    const token = localStorage.getItem("token");

    if (user) {
      try {
        const response = await cartService.getCart(token);
        if (response.status === 200) {
          dispatch(updateCart(response.data.data.products));
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    } else {
      console.log("User is not logged in");
    }
  };

  const handleRemove = (id) => {
    const token = localStorage.getItem("token");

    swal
      .fire({
        text: "Are you sure you want to remove item?",
        showCancelButton: true,
        cancelButtonColor: "#ffca28",
        confirmButtonColor: "#ef4444",
        confirmButtonText: "Remove",
        position: "top",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await cartService.removeFromCart(id, token); // Use the cartService function to remove the item from the cart
            dispatch(remove(id)); // Dispatch the action to remove the item from the Redux store
            showToast("Item removed from cart", "success");
          } catch (error) {
            console.error("Error removing item from cart:", error);
            showToast("Error removing item from cart", "error");
          }
        }
      });
  };
  // Check if the cart is empty
  const isCartEmpty = products.length === 0;
  useEffect(() => {
    if (isCartEmpty) {
      router.push("/shop");
    }
  }, [isCartEmpty, router]);
  // Calculate subtotal based on cart items
  const subtotal = products.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  // Fixed shipping charge
  const shippingCharge = 10.0;

  // Calculate tax amount (13% of subtotal)
  const taxRate = 0.13;
  const taxAmount = subtotal * taxRate;

  // Calculate total price
  const total = subtotal + shippingCharge + taxAmount;

  const handleUpdateQuantity = async (id, quantity) => {
    const token = localStorage.getItem("token");
    try {
      // Validate the quantity to ensure it's a positive integer value or set it to 1 if it's not a valid number
      const validatedQuantity =
        Number.isInteger(quantity) && quantity > 0 ? quantity : 1;
      await cartService.updateCartProduct(id, validatedQuantity, token);
      const updatedProducts = products.map((item) =>
        item.product._id === id
          ? { ...item, quantity: validatedQuantity }
          : item
      );
      dispatch(updateCart(updatedProducts));
      showToast("Quantity updated successfully", "success");
    } catch (error) {
      console.error("Error updating quantity:", error);
      showToast("Error updating quantity", "error");
    }
  };

  return (
    <>
      <ComplexNavbar />
      <div className="py-8 px-4 mx-auto max-w-screen-2xl mt-20 ">
        <Breadcrumbs fullWidth>
          <Link href="/" className="opacity-60">
            Home
          </Link>
          <Link href="/checkout" className="">
            Checkout
          </Link>
        </Breadcrumbs>
        <div className=" md:flex justify-between lg:gap-20">
          <Card
            color="transparent"
            className="w-full md:px-10 md:py-10"
            shadow={false}
          >
            <Typography variant="h4" color="blue-gray">
              Order Summary
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Order summary of your items
            </Typography>
            <div className="mt-8 ">
              <div className="flow-root ">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {products.map((item) => (
                    <li key={item.product._id} className="flex py-6">
                      <div className=" h-12 w-12 md:h-24 md:w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={`${imgURL}/${item.product.image}`}
                          alt={item.product.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-xs md:text-sm font-medium text-gray-900">
                            <h3>
                              <a href={item.product.href}>
                                {item.product.name}
                              </a>
                            </h3>
                            <p className="ml-4"> {item.product.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.product.color}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-xs md:text-sm">
                          <div className="flex gap-4 p-2">
                            <MinusIcon
                              onClick={() =>
                                handleUpdateQuantity(
                                  item.product._id,
                                  item.quantity - 1
                                )
                              }
                              className="font-medium h-6 text-amber-600 hover:text-amber-500 cursor-pointer"
                            />

                            <Typography className="text-gray-700 ">
                              Qty
                            </Typography>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                handleUpdateQuantity(
                                  item.product._id,
                                  parseInt(e.target.value, 10) // Parse the input value as an integer with base 10
                                )
                              }
                              className="w-16 text-center border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                              min="1" // Set the minimum allowed value to 1
                            />
                            <PlusIcon
                              onClick={() =>
                                handleUpdateQuantity(
                                  item.product._id,
                                  item.quantity + 1
                                )
                              }
                              className="font-medium h-6 text-amber-600 hover:text-amber-500 cursor-pointer"
                            />
                          </div>
                          <div className="flex p-2 ">
                            <button
                              type="button"
                              onClick={() => handleRemove(item.product._id)}
                              className="font-medium text-amber-600 hover:text-amber-500 "
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-200 py-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>

              <div className="flex justify-between py-1 text-base font-medium text-gray-900">
                <p>Shipping Charge</p>
                <p>${shippingCharge.toFixed(2)}</p>{" "}
              </div>
              <div className="flex justify-between py-1 text-base font-medium text-gray-900">
                <p>Taxes</p>
                <p>${taxAmount.toFixed(2)}</p>
              </div>
              <div className="flex border-t border-gray-200 py-2 justify-between text-xl font-bold text-gray-900 mt-4">
                <p>Total</p>
                <p>${total.toFixed(2)}</p>{" "}
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-6">
                <Checkbox
                  label={
                    <Typography
                      variant="small"
                      color="gray"
                      className="flex items-center font-normal"
                    >
                      I agree to the
                      <span className="font-medium transition-colors hover:text-amber-500">
                        &nbsp;Terms and Conditions
                      </span>
                    </Typography>
                  }
                  containerProps={{ className: "-ml-2.5" }}
                />
                <Link
                  href="/checkout/payment"
                  className="flex items-center justify-center rounded-md border border-transparent bg-amber-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-amber-700"
                >
                  Proceed to Payment
                </Link>
              </div>
            </div>
          </Card>
          <Card
            color="transparent"
            className=" w-full mt-8 md:mt-0 md:w-1/2 md:px-10 md:py-10"
            shadow={false}
          >
            <Typography variant="h4" color="blue-gray">
              Shipping information
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Enter your shipping information.
            </Typography>
            <div className="flex justify-end">
              <Typography variant="body2" color="blue-gray" className="mr-2">
                <a href="#">Edit</a>
              </Typography>
            </div>
            <div className="mt-8 mb-2 ">
              <form className="mb-4 flex flex-col gap-6">
                <Input size="lg" label="Full Name" />
                <Input size="lg" label="Address" />
                <Input size="lg" label="City" />
                <Input size="lg" label="Postal Code" />
                <Input size="lg" label="Phone Number" />
                <Button
                  type="submit"
                  className="flex items-center justify-center rounded-md border border-transparent bg-amber-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-amber-700"
                >
                  Update Shipping Information
                </Button>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default DeliveryDetailsForm;
