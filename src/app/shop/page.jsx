"use client";
import Slider from "@/components/Carousel";
import ProtectedRoute from "@/utils/Context/ProtectedRoute";
import { Input, Typography } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Product from "@/components/Product";
import ProductService from "../../utils/Services/ProductService";
import swal from "sweetalert2";
import { toast } from "react-toastify";
import Pagination from "@/components/DashboardComponents/Pagination";
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // New state variable for search

  const pageSize = 15;

  const getProducts = () => {
    const token = localStorage.getItem("token");
    const limit = pageSize;
    const offset = (currentPage - 1) * pageSize;
    ProductService.getAllProducts(token, limit, offset)
      .then((res) => {
        console.log(res);
        const allProducts = res.data.data;
        // Filter products based on the searchQuery (name contains the searchQuery)
        const filteredProducts = allProducts.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setProducts(filteredProducts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProducts();
  }, [currentPage, searchQuery]); // Update the dependency array

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(products.length / pageSize)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(products.length / pageSize);

  // Get the products for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentProducts = products.slice(startIndex, endIndex);
  return (
    <div className="mx-auto max-w-screen-2xl pt-28 pb-20 px-4">
      <div className=" flex justify-between gap-10 mx-auto max-w-screen-2xl pb-6 ">
        <div className="">
          <Typography variant="h4" color="orange" className=" ">
            Shop
          </Typography>
        </div>
        <div className="w-full md:w-72">
          <Input
            label="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          />
        </div>
      </div>
      <div className="">
        <Product currentProducts={currentProducts} />
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalProducts={products.length}
      />
    </div>
  );
};

export default ProtectedRoute(Shop);
