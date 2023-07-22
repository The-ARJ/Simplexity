"use client";
import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";

export default function AddProductForm() {
  // State variables to store the product information
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState(null);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can implement the logic to add the product to the database or API.
    // For simplicity, we'll just log the product details for now.
    console.log({
      productName,
      productDescription,
      productPrice,
      productImage,
    });
  };

  return (
    <Card color="transparent" shadow={false} className=" flex items-center ">
      <form
        className="mt-8 mb-2 w-full md:max-w-xl px-4 py-10 rounded-xl shadow-lg"
        onSubmit={handleSubmit}
      >
        <Typography variant="h4" color="blue-gray" className=" py-4">
          Add Product
        </Typography>
        <div className="mb-4 flex flex-col gap-6">
          <Input
            size="lg"
            label="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <Input
            size="lg"
            label="Product Description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
          <Input
            size="lg"
            label="Product Price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
          <label>Upload Product Image</label>
          <input
            type="file"
            onChange={(e) => setProductImage(e.target.files[0])}
          />
        </div>
        <Button className="mt-6" color="amber" fullWidth type="submit">
          Add Product
        </Button>
      </form>
    </Card>
  );
}
