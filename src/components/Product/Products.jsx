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
  
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
        {products.map((product) => (
          <Card key={product._id} className="md:w-64 md:h-[450px]">
            <CardHeader
              shadow={false}
              floated={false}
              className=" h-56 md:h-64"
            >
              <Link href={`/shop/${product.slug}`}>
                <img
                  src={`${imgURL}/${product.image}`}
                  className="w-full h-full object-cover"
                  alt={product.name}
                />
              </Link>
            </CardHeader>
            <CardBody className=" md:h-60">
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
              <AddToCart product={product} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
