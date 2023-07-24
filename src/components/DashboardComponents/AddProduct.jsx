"use client";
import { useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
  Textarea,
} from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/solid";
import ProductService from "../../utils/Services/ProductService";
import { toast } from "react-toastify";

export default function AddProductForm() {
  // State variables to store the product information
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // // Function to handle form submission
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Here, you can implement the logic to add the product to the database or API.
  //   // For simplicity, we'll just log the product details for now.
  //   console.log({
  //     productName,
  //     productDescription,
  //     productPrice,
  //     productImage,
  //   });
  // };
  const submitForm = async () => {
    const formData = new FormData();
    formData.append("productImage", productImage);
    formData.append("name", productName);
    formData.append("description", productDescription);
    formData.append("price", productPrice);
    formData.append("quantity", productQuantity);
    formData.append("category", productCategory);

    try {
      const response = await ProductService.createProduct(formData);
      console.log(response);
      toast.success("Product Added Successfully", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      console.log(err);
      toast.error(
        "Error Creating Product",
        {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        },
        err
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitForm();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
    const reader = new FileReader();
    reader.onload = function (event) {
      setPreviewImage(event.target.result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <Card
      color="transparent"
      shadow={false}
      className=" flex items-center mb-20 "
    >
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
          <Textarea
            size="lg"
            label="Product Description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
          <Input
            size="lg"
            label="Product Price"
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
          <Input
            size="lg"
            label="Product Quantity"
            type="number"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
          />
          <div className="">
            <Select
              label="Select Product Category"
              value={productCategory}
              onChange={(e) => setProductCategory(e)}
              animate={{
                mount: { y: 0 },
                unmount: { y: 25 },
              }}
            >
              <Option value="Jacket">Jackets</Option>
              <Option value="Shirts and Tops">Shirts and Tops</Option>
              <Option value="Fleece">Fleece</Option>
              <Option value="Foot Wears">Foot Wears</Option>
              <Option value="Base Layers">Base Layers</Option>
            </Select>
          </div>
          <label>Upload Product Image</label>
          <div className="flex items-center justify-center">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="image-upload"
              onChange={handleImageChange}
            />
            <label
              htmlFor="image-upload"
              className="w-full rounded-lg h-48 sm:h-52 md:h-64 overflow-hidden object-cover cursor-pointer"
            >
              {previewImage ? (
                <img
                  className="w-full h-full object-cover"
                  src={previewImage}
                  alt="participant"
                />
              ) : (
                <div className="w-full text-gray-800 dark:text-white h-full flex justify-center items-center">
                  <PlusIcon className=" opacity-50 h-10" />
                  <p>Upload Product Image</p>
                </div>
              )}
            </label>
          </div>
        </div>
        <Button className="mt-6" color="amber" fullWidth type="submit">
          Add Product
        </Button>
      </form>
    </Card>
  );
}
