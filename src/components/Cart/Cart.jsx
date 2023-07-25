import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Badge, MenuItem, Typography } from "@material-tailwind/react";
import React, { useEffect, useContext } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { imgURL } from "../../utils/Services/UserService";
import { remove, updateCart } from "@/utils/Redux/CartSlice";
import swal from "sweetalert2";

import cartService from "@/utils/Services/CartService";
import { UserContext } from "../../utils/Context/UserContext";
import showToast from "./Toast";

export default function Cart() {
  const { user, loading } = useContext(UserContext);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart);

  const [open, setOpen] = useState(false);

  const token = localStorage.getItem("token");
  // Fetch cart data when the component mounts
  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
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

  const handleOpenCart = async () => {
    await fetchCartData();
    setOpen(true);
  };

  const handleRemove = (id) => {
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

  // Calculate subtotal based on cart items
  const subtotal = products.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  return (
    <div className="lg:ml-auto">
      <Badge
        content={products.length}
        withBorder
        color="amber"
        className="text-white"
      >
        <Typography
          as="a"
          variant="small"
          color="blue-gray"
          className="font-normal"
          onClick={handleOpenCart}
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            <ShoppingCartIcon className="h-[18px] w-[18px]" />
            <p className="hidden md:block">Cart</p>
          </MenuItem>
        </Typography>
      </Badge>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-sm">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Shopping Cart
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                        {isCartEmpty ? (
                          <p className="mt-8 text-center items-center text-gray-500">
                            Your cart is empty. Continue shopping!
                          </p>
                        ) : (
                          <div className="mt-8">
                            <div className="flow-root">
                              <ul
                                role="list"
                                className="-my-6 divide-y divide-gray-200"
                              >
                                {products.map((item) => (
                                  <li
                                    key={item.product._id}
                                    className="flex py-6"
                                  >
                                    <div className="h-12 w-12 md:h-24 md:w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
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
                                          <p className="ml-4">
                                            {item.product.price}
                                          </p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">
                                          {item.product.color}
                                        </p>
                                      </div>
                                      <div className="flex flex-1 items-end justify-between text-xs md:text-sm">
                                        <p className="text-gray-500">
                                          Qty {item.quantity}
                                        </p>

                                        <div className="flex">
                                          <button
                                            type="button"
                                            onClick={() =>
                                              handleRemove(item.product._id)
                                            }
                                            className="font-medium text-amber-600 hover:text-amber-500"
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
                        )}
                      </div>

                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>${subtotal.toFixed(2)}</p>
                        </div>

                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <Link
                            href="/checkout"
                            className="flex items-center justify-center rounded-md border border-transparent bg-amber-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-amber-700"
                          >
                            Proceed To Checkout
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
