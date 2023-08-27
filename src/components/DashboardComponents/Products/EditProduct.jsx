"use client";
import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  Tooltip,
  IconButton,
  Card,
  Input,
  Typography,
  Select,
  Option,
  Textarea,
} from "@material-tailwind/react";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import ProductService from "../../../utils/Services/ProductService";
import { toast } from "react-toastify";
import { imgURL } from "../../../utils/Services/UserService";
import { useSelector } from "react-redux";

export function EditProduct({ product }) {
  const [open, setOpen] = React.useState(false);
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const handleOpen = () => setOpen(!open);

  // State variables to store the product information
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [previewUpdateImage, setpreviewUpdateImage] = useState(null);

  useEffect(() => {
    // Set initial state when the "product" prop changes (when dialog opens)
    if (product) {
      setProductName(product.name);
      setProductDescription(product.description);
      setProductPrice(product.price);
      setProductQuantity(product.quantity);
      setProductCategory(product.category);
      // Set preview image if a product image is available
      if (product.imageUrl) {
        setpreviewUpdateImage(product.imageUrl);
      }
    }
  }, [product]);

  const submitForm = async () => {
    const formData = new FormData();
    formData.append("productImage", productImage);
    formData.append("name", productName);
    formData.append("description", productDescription);
    formData.append("price", productPrice);
    formData.append("quantity", productQuantity);
    formData.append("category", productCategory);

    try {
      const token = user.token;
      const response = await ProductService.updateProduct(
        product._id,
        formData,
        token
      );
      console.log(response);
      toast.success("Product Updated Successfully", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      handleOpen(); // Close the dialog after successful update
    } catch (err) {
      console.log(err);
      toast.error("Error Updating Product", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
      setpreviewUpdateImage(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Tooltip content="Edit Product">
        <IconButton onClick={handleOpen} variant="text" color="blue-gray">
          <PencilIcon className="h-4 w-4" />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        handler={handleOpen}
        className=" overflow-y-auto h-[600px]"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <Card
          color="transparent"
          shadow={false}
          className=" flex items-center mb-20 "
        >
          <form
            className="mt-8 mb-2 w-full md:max-w-md px-4 py-10 rounded-xl shadow-lg"
            onSubmit={handleSubmit}
          >
            <Typography variant="h4" color="blue-gray" className=" py-4">
              Update Product
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
                  id="edit-image-upload" // Use a unique id for the file input
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="edit-image-upload"
                  className="w-full rounded-lg h-48 sm:h-52 md:h-64 overflow-hidden object-cover cursor-pointer"
                >
                  {previewUpdateImage ? (
                    <img
                      className="w-full h-full object-cover"
                      src={previewUpdateImage}
                      alt="product"
                    />
                  ) : product.image ? (
                    <img
                      className="w-full h-full object-cover"
                      src={
                        previewUpdateImage
                          ? { previewUpdateImage }
                          : `${imgURL}/${product.image}`
                      }
                      alt="participant"
                    />
                  ) : (
                    <div className="w-full text-gray-800 dark:text-white h-full flex justify-center items-center">
                      <PlusIcon className="opacity-50 h-10" />
                      <p>Upload Product Image</p>
                    </div>
                  )}
                </label>
              </div>
            </div>
            <Button className="mt-6" color="amber" fullWidth type="submit">
              Update Product
            </Button>
          </form>
        </Card>
      </Dialog>
    </>
  );
}
