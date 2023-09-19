import { imgURL } from "../../utils/Services/UserService";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  CardFooter,
} from "@/components/MaterialComponents/Material-Tailwind";
import Link from "next/link";
import AddToCart from "../AddToCart";
export default function Products({ products }) {
  if (products.length === 0) {
    return (
      <div className="text-center my-10">
        <Typography variant="h5" color="gray">
          No Product Found
        </Typography>
      </div>
    );
  }
  return (
    <div className="">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-10">
        {products.map((product) => (
          <Card key={product._id} className=" md:w-64 h-[200px] md:h-[450px]">
            <CardHeader
              shadow={false}
              floated={false}
              className=" m-1 h-24  md:h-64 "
            >
              <Link href={`/shop/${product.slug}`}>
                <img
                  src={`${imgURL}/${product.image}`}
                  className="w-full h-full object-cover"
                  alt={product.name}
                />
              </Link>
            </CardHeader>
            <CardBody className=" p-2 md:p-4 h-24 md:h-60 ">
              <div className="flex flex-col md:flex-row items-start justify-center gap-2 md:gap-4 mb-2">
                <Typography
                  color="blue-gray"
                  className="font-medium text-xs md:text-base"
                >
                  {product.name}
                </Typography>
                <Typography
                  color="blue-gray"
                  className="font-medium text-amber-500 text-sm md:text-base "
                >
                  ${product.price}
                </Typography>
              </div>
              <Typography
                variant="small"
                color="gray"
                className="font-normal opacity-75 md:block hidden"
              >
                {product.description}
              </Typography>
            </CardBody>

            <CardFooter className="pt-0  hidden md:block">
              <AddToCart product={product} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
