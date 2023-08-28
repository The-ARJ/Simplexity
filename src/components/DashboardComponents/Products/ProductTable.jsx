import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { imgURL } from "../../../utils/Services/UserService";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import ProductService from "../../../utils/Services/ProductService";
import swal from "sweetalert2";
import { toast } from "react-toastify";
import { EditProduct } from "./EditProduct";
import { useSelector } from "react-redux";
import showToast from "@/components/Cart/Toast";

const TABLE_HEAD = [
  "Product",
  "Description",
  "Category",
  "Created At",
  "Updated At",
  "Action",
];

export function ProductTable() {
  const [open, setOpen] = React.useState(false);
  const { user } = useSelector((state) => state.user);

  const handleOpen = () => setOpen(!open);

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // New state variable for search

  const pageSize = 4;

  const getProducts = () => {
    const token = user.token;
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

  const deleteProduct = (id, getProducts) => {
    const token = user.token;
    console.log(id);
    swal
      .fire({
        text: "Are you sure you want to Delete?",
        showCancelButton: true,
        cancelButtonColor: "#7e22ce",
        confirmButtonColor: "#ef4444",
        confirmButtonText: "Delete",
        position: "top",
      })
      .then((result) => {
        if (result.isConfirmed) {
          ProductService.deleteProductbyId(id, token)
            .then(() => {
              showToast("Product Deleted Successfully", "success");
              getProducts();
            })
            .catch((err) => {
              showToast("Error Deleting Product", "error");
            });
        }
      });
  };

  return (
    <Card className="h-full w-full mb-20">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Products list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all products
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              value={searchQuery} // Set the searchQuery value
              onChange={(e) => setSearchQuery(e.target.value)} // Handle search input change
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-0">
        {currentProducts.length === 0 ? (
          <Typography
            variant="body"
            color="blue-gray"
            className="p-4 text-center"
          >
            No items found.
          </Typography>
        ) : (
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}{" "}
                      {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon
                          strokeWidth={2}
                          className="h-4 w-4"
                        />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => {
                const classes = "p-4 border-b border-blue-gray-50";
                return (
                  <tr key={name}>
                    <td className={classes}>
                      <div className="flex items-start justify-start gap-3">
                        <Avatar
                          src={`${imgURL}/${product.image}`}
                          variant="rounded"
                          alt={product.name}
                          size="lg"
                        />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {product.name}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            Price: Rs.{product.price} / Unit
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            Quantity: {product.quantity} Units.{" "}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className=" w-[400px] py-2">
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blueGray"
                          className="font-normal"
                        >
                          {product.description}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {product.category}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {new Date(product.createdAt).toLocaleString()}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {new Date(product.updatedAt).toLocaleString()}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <EditProduct product={product} />

                      <Tooltip content="Delete Product">
                        <IconButton
                          onClick={() =>
                            deleteProduct(product._id, getProducts)
                          }
                          variant="text"
                          color="red"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {currentPage} of {totalPages}
        </Typography>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            color="blue-gray"
            size="sm"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            color="blue-gray"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
