import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import { imgURL } from "../utils/Services/UserService";
import React, { useContext, useState } from "react";
import { UserContext } from "../utils/Context/UserContext";
import AuthDialog from "./Auth/AuthDialogue";
import { useDispatch } from "react-redux";
import { add } from "@/utils/Redux/CartSlice";

export default function Product({ currentProducts }) {
  const { user, loading } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleCart = (product) => {
    if (user) {
      dispatch(add(product));
      console.log("Product added to cart:", product); // Log the selected product
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => setOpen(false);

  if (currentProducts.length === 0) {
    return (
      <Typography className=" text-center" color="blue-gray">
        No products available.
      </Typography>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
      <AuthDialog open={open} handleClose={handleClose} />
      {currentProducts.map((product) => (
        <Card key={product._id} className="md:w-64 md:h-[450px]">
          <CardHeader shadow={false} floated={false} className=" h-56 md:h-64">
            <img
              src={`${imgURL}/${product.image}`}
              className="w-full h-full object-cover"
              alt={product.name}
            />
          </CardHeader>
          <CardBody>
            <div className="flex items-center justify-between mb-2">
              <Typography color="blue-gray" className="font-medium">
                {product.name}
              </Typography>
              <Typography color="blue-gray" className="font-medium">
                ${product.price}
              </Typography>
            </div>
            <Typography
              variant="small"
              color="gray"
              className="font-normal opacity-75"
            >
              {product.description}
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              onClick={() => handleCart(product)}
              ripple={false}
              fullWidth={true}
              className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100"
            >
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
