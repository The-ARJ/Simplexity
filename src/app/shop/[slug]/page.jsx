import React from "react";
import Product from "@/components/Product/ProductDetail";
import getProduct from "@/lib/getProduct";
import Await from "@/components/Product/Await";

const ProductDetail = ({ params }) => {
  const promise = getProduct({ params });

  return (
    <>
      <div className=" py-8 pt-36">
        <Await promise={promise}>
          {(result) => {
            const boughtByUserIds = Array.isArray(result.boughtBy)
              ? result.boughtBy
              : [result.boughtBy];
            return (
              <>
                <Product product={result} boughtByUserIds={boughtByUserIds} />
              </>
            );
          }}
        </Await>
      </div>
    </>
  );
};

export default ProductDetail;
