"use client";
import React from "react";
import { Breadcrumbs } from "@material-tailwind/react";

import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import ComplexNavbar from "@/components/Header/Header";
import Link from "next/link";
const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    price: "$32.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  // More products...
];
const DeliveryDetailsForm = () => {
  return (
    <>
      <ComplexNavbar />
      <div className="py-8 px-4 mx-auto max-w-screen-2xl mt-20 ">
        <Breadcrumbs fullWidth>
          <Link href="/" className="opacity-60">
            Home
          </Link>
          <Link href="/checkout" className="">
            Order Summary
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
                  {products.map((product) => (
                    <li key={product.id} className="flex py-6">
                      <div className=" h-12 w-12 md:h-24 md:w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={product.imageSrc}
                          alt={product.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-xs md:text-sm font-medium text-gray-900">
                            <h3>
                              <a href={product.href}>{product.name}</a>
                            </h3>
                            <p className="ml-4">{product.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {product.color}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-xs md:text-sm">
                          <p className="text-gray-500">
                            Qty {product.quantity}
                          </p>

                          <div className="flex ">
                            <button
                              type="button"
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
              <div className="flex justify-between py-1 text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>$262.00</p>
              </div>
              <div className="flex justify-between py-1 text-base font-medium text-gray-900">
                <p>Shipping Charge</p>
                <p>$10.00</p>{" "}
              </div>
              <div className="flex justify-between py-1 text-base font-medium text-gray-900">
                <p>Taxes</p>
                <p>$15.00</p>
              </div>
              <div className="flex border-t border-gray-200 py-2 justify-between text-xl font-bold text-gray-900 mt-4">
                <p>Total</p>
                <p>$287.00</p>{" "}
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
                  href="/checkout"
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
