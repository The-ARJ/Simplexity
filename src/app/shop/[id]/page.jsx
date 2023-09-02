"use client";
import ProductService from "../../../utils/Services/ProductService";
import React, { useState, useEffect } from "react";
import Product from "@/components/Product/ProductDetail";

const ProductDetail = ({ params }) => {
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

  const boughtByUserIds = Array.isArray(product.boughtBy)
    ? product.boughtBy
    : [product.boughtBy];
  return (
    <>
      <div className=" py-8 pt-36">
        <Product product={product} boughtByUserIds={boughtByUserIds} />
      </div>
    </>
  );
};

export default ProductDetail;
